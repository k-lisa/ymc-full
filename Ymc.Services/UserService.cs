using Ymc.Data;
using Ymc.Data.Extensions;
using Ymc.Data.Providers;
using Ymc.Models;
using Ymc.Models.Domain;
using Ymc.Models.Requests;
using Ymc.Services.Cryptography;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Services
{
    public class UserService : IUserService
    {
        private IAuthenticationService _authenticationService;
        private ICryptographyService _cryptographyService;
        private IDataProvider _dataProvider;
        private const int HASH_ITERATION_COUNT = 1;
        private const int RAND_LENGTH = 15;

        public UserService(IAuthenticationService authSerice, ICryptographyService cryptographyService, IDataProvider dataProvider)
        {
            _authenticationService = authSerice;
            _dataProvider = dataProvider;
            _cryptographyService = cryptographyService;
        }


        public bool LogIn(string email, string password, bool isPersistent)
        {
            bool isSuccessful = false;

            string salt = GetSalt(email);
            bool isEmailConfirmed = GetEmailConfirmation(email);
            if (!String.IsNullOrEmpty(salt) && isEmailConfirmed != false)
            {
                string passwordHash = _cryptographyService.Hash(password, salt, HASH_ITERATION_COUNT);

                IUserAuthData response = Get(email, passwordHash);

                if (response != null)
                {
                    Claim firstName = new Claim("FirstName", response.FirstName);
                    Claim lastName = new Claim("LastName", response.LastName);
                    Claim photoUrl = new Claim("PhotoUrl", response.PhotoUrl);
                    

                    _authenticationService.LogIn(response, isPersistent, new Claim[] { firstName, lastName, photoUrl });
                    isSuccessful = true;
                    
                }
            }
            return isSuccessful;
        }
        public bool GetEmailConfirmation(string email)
        {
            AccountIsEmailConfirmed isEmailConfirmed = null;
            _dataProvider.ExecuteCmd("dbo.Person_SelectEmailConfirmationForLogin", inputParamMapper: delegate(SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
            },
             singleRecordMapper: delegate (IDataReader reader, short set)
             {
                 isEmailConfirmed = new AccountIsEmailConfirmed();
                 int ord = 0;
                 isEmailConfirmed.HasEmailBeenConfirmed = reader.GetSafeBool(ord++);

             });
            return isEmailConfirmed.HasEmailBeenConfirmed;

        }
       


        public int Create(AccountUpsertRequest userModel)
        {
            int userId = 0;
            string salt;
            string passwordHash;

            string password = userModel.Password;

            salt = _cryptographyService.GenerateRandomString(RAND_LENGTH);
            passwordHash = _cryptographyService.Hash(password, salt, HASH_ITERATION_COUNT);

            _dataProvider.ExecuteNonQuery("dbo.Person_UpsertAccount",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", userModel.Id);
                    paramCollection.AddWithValue("@FirstName", userModel.FirstName);
                    paramCollection.AddWithValue("@LastName", userModel.LastName);
                    paramCollection.AddWithValue("@Email", userModel.Email);
                    paramCollection.AddWithValue("@Salt", salt);
                    paramCollection.AddWithValue("@PasswordHash", passwordHash);
                    paramCollection.AddWithValue("@RoleId", userModel.RoleId);
                    //SqlParameter idParameter = new SqlParameter("@Id", SqlDbType.Int);
                    //idParameter.Direction = ParameterDirection.Output;
                    //paramCollection.Add(idParameter);
                }
                //,
                //returnParameters: delegate (SqlParameterCollection param)
                //{
                //    Int32.TryParse(param["@Id"].Value.ToString(), out userId);
                //}
                );
                  
            //1)creating token
            SecurityTokenService sts = new SecurityTokenService(_dataProvider);
            SecurityTokenAddRequest star = new SecurityTokenAddRequest()
            {
                TokenTypeId = 1,
                UserEmail = userModel.Email
            };
            System.Guid tokenGuid = sts.Insert(star);
            //2)emailing confirmation
            var source = SiteConfig.BaseUrl;
            var message =
                 "<body style='margin: 0; padding: 0; background:#ccc;'><table cellpadding=0 cellspacing=0 style='width: 100%;'><tr><td style='padding: 12px 2%;'><table cellpadding=0 cellspacing=0 style='margin:auto; background: #fff; width: 96%;'><tr><td style='padding: 12px 2%;'><div><h1 style='color:white;background-color:#1E90FF;'>Youth Mentoring Connection</h1></div > <div><h2 style='margin-top: 0;'>Congratulations</h2><p>You've successfully registered. Please confirm your email with Youth Mentoring Connection.To confirm your email click the link below:<br/></br> <span style='text-align:center; margin:0;'><a href=" 
                 + source + "/confirmationPages?guid=" 
                 + tokenGuid + ">Click Here To Confirm Email</a></p><p>...</p></div><div><h4 style='margin-top: 0;'>Sawubona!</h4><p></p></div><div style='border-top: solid 1px #ccc;'><p></p></div></td ></tr ></table ></td ></tr ></table ></body >";

            ConfirmationEmailService ces = new ConfirmationEmailService();
            ConfirmationEmailRequest cer = new ConfirmationEmailRequest()
            {
                From = "john@ymc.la",
                To = userModel.Email,
                Subject = "YMC Confirmation",
                Body = message
            };
            Task<bool> email =  ces.Execute(cer);

            return userId;
            //DB provider call to create user and get us a user id
            //be sure to store both salt and passwordHash
            //DO NOT STORE the original password value that the user passed us
        }

        /// <summary>
        /// Gets the Data call to get a give user
        /// </summary>
        /// <param name="email"></param>
        /// <param name="passwordHash"></param>
        /// <returns></returns>
        private IUserAuthData Get(string email, string passwordHash)
        {
            UserBase user = null;
            _dataProvider.ExecuteCmd("dbo.Person_SelectUser", inputParamMapper: delegate (SqlParameterCollection paramCollection)
            {
                paramCollection.AddWithValue("@Email", email);
                paramCollection.AddWithValue("@PasswordHash", passwordHash);
            },
            singleRecordMapper: delegate (IDataReader reader, short set)
            {
                switch (set)
                {
                    case 0:
                        user = new UserBase();
                        int ord = 0;
                        user.Id = reader.GetSafeInt32(ord++);
                        user.FirstName = reader.GetSafeString(ord++);
                        user.LastName = reader.GetSafeString(ord++);
                        string photoFileKey = reader.GetSafeString(ord++);
                        if (String.IsNullOrEmpty(photoFileKey))
                        {
                            photoFileKey = SiteConfig.DefaultProfileFileKey;
                        }
                        user.PhotoUrl = SiteConfig.GetUrlForFile(photoFileKey);
                        

                        break;

                    case 1:
                        if (user.Roles == null)
                        {
                            user.Roles = new List<string>();
                        }

                        user.Roles.Add(reader.GetSafeString(1));
                                               
                        break;

                    default:
                        break;
                }
            }
            );

            return user;
        }

        /// <summary>
        /// The Dataprovider call to get the Salt for User with the given UserName/Email
        /// </summary>
        /// <param name="email"></param>
        /// <returns></returns>
        private string GetSalt(string email)
        {
            //throw new NotImplementedException();
            //DataProvider Call to get Salt
            AccountSalt salt = null;

            _dataProvider.ExecuteCmd("dbo.Person_SelectSaltByEmail",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Email", email);
                },
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    salt = new AccountSalt();
                    int ord = 0;
                    salt.Salt = reader.GetSafeString(ord++);

                });
           
                return salt.Salt;
            
        }
        public AccountRegistrationRetrieval GetName(string email)
        {
            AccountRegistrationRetrieval acc = null;
            _dataProvider.ExecuteCmd("dbo.Person_SelectNameByEmail",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Email", email);
                },
                singleRecordMapper: delegate (IDataReader rdr, short set)
                {
                    switch (set)
                    {
                        case 0:
                            int ord = 0;
                            acc = new AccountRegistrationRetrieval();
                            PersonBase p = new PersonBase();
                            acc.Person = p;
                            acc.Person.Id = rdr.GetSafeInt32(ord++);
                            acc.Person.FirstName = rdr.GetSafeString(ord++);
                            acc.Person.LastName = rdr.GetSafeString(ord++);
                            acc.PasswordHash = rdr.GetSafeString(ord++);
                                                      
                            break;

                        case 1:
                          if(acc.RoleIds == null){
                                acc.RoleIds = new List<int>();

                            }
                            acc.RoleIds.Add(rdr.GetSafeInt32(1));
                            break;

                        default:
                            // Execute this for additional result sets
                            break;
                    }
                });
            return acc;

        }
       
    }
}
