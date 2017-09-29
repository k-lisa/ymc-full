using Ymc.Data;
using Ymc.Data.Providers;
using Ymc.Models.Domain;
using Ymc.Models.Requests;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ymc.Services
{
    public class LanguageService : ILanguageService
    {
        private IDataProvider _prov;

        public LanguageService(IDataProvider provider)
        {
            _prov = provider;

        }
        public List<Language> Get()
        {
            List<Language> list = null;

            _prov.ExecuteCmd("dbo.Language_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    switch (set)
                    {
                        case 0:
                            Language l = MapLanguage(reader);
                            if (list == null)
                            {
                                list = new List<Language>();
                            }
                            list.Add(l);
                            break;
                        default:
                            break;
                    }
                });
            return list;
        }
        public int Post(LanguageAddRequest model)
        {
            int LanguageId = 0;

             _prov.ExecuteNonQuery("dbo.Language_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    MapCommonParamaters(model, paramCollection);
                    SqlParameter idParameter = new SqlParameter("@Id", SqlDbType.Int);
                    idParameter.Direction = ParameterDirection.Output;
                    paramCollection.Add(idParameter);
                },
                returnParameters: delegate (SqlParameterCollection param)
                {
                    Int32.TryParse(param["@Id"].Value.ToString(), out LanguageId);
                });
            return LanguageId;
        }
        public Language GetById(int Id)
        {
            Language lan = null;

            _prov.ExecuteCmd("dbo.Language_SelectById"
                , inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    lan = MapLanguage(reader);

                });
            return lan;
        }

        

        public void Update(LanguageUpdateRequest model, int Id)
        {
            _prov.ExecuteNonQuery("dbo.Language_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                    MapCommonParamaters(model, paramCollection);
                });                    
        }
        public void Delete(int Id)
        {
            _prov.ExecuteNonQuery("dbo.Language_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                });
        }

#region Helper Methods
        private static void MapCommonParamaters(LanguageAddRequest model, SqlParameterCollection paramCollection)
        {
            paramCollection.AddWithValue("@Code", model.Code);
            paramCollection.AddWithValue("@Name", model.Name);
            paramCollection.AddWithValue("@DisplayOrder", model.DisplayOrder);
            paramCollection.AddWithValue("@Inactive", model.Inactive);
            paramCollection.AddWithValue("@UserId", 1);

        }

        private static Language MapLanguage(IDataReader reader)
        {
            Language lan = new Language();
            int startingIndex = 0;

            lan.Id = reader.GetSafeInt32(startingIndex++);
            lan.Code = reader.GetSafeString(startingIndex++);
            lan.Name = reader.GetSafeString(startingIndex++);
            lan.DisplayOrder = reader.GetSafeInt32(startingIndex++);
            lan.Inactive = reader.GetSafeBool(startingIndex++);
            return lan;
        }

       
        #endregion
    }
}
