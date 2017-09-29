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
    public class EducationLevelService
    {
        private IDataProvider _prov;

        public EducationLevelService(IDataProvider provider)
        {
            _prov = provider;
        }
        // GET
        public List<EducationLevel> Get()
        {
            List<EducationLevel> list = null;
            _prov.ExecuteCmd("dbo.EducationLevel_SelectAll",
                inputParamMapper: null,
                singleRecordMapper: delegate (IDataReader rdr, short set)
                {
                    switch (set)
                    {
                        case 0:
                            EducationLevel el = new EducationLevel();
                            int ord = 0;                          
                                el.Id = rdr.GetSafeInt32(ord++);
                                el.Code = rdr.GetSafeString(ord++);
                                el.LevelOfEducation = rdr.GetSafeString(ord++);
                                el.DisplayOrder = rdr.GetSafeInt32(ord++);
                                el.Inactive = rdr.GetSafeBool(ord++);

                            if (list == null)
                            {
                                list = new List<EducationLevel>();

                            }
                            list.Add(el);
                            break;
                        default:
                            //for additional result sets
                            break;
                    }
                });
            return list;

        }
        public EducationLevel GetById(int id)
        {
            EducationLevel item = null;
            _prov.ExecuteCmd("dbo.EducationLevel_SelectById",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }, singleRecordMapper: delegate (IDataReader rdr, short set)
                {
                    item = new EducationLevel();
                    int ord = 0;
                    item.Id = rdr.GetSafeInt32(ord++);
                    item.Code = rdr.GetSafeString(ord++);
                    item.LevelOfEducation = rdr.GetSafeString(ord++);
                    item.DisplayOrder = rdr.GetSafeInt32(ord++);
                    item.Inactive = rdr.GetSafeBool(ord++);


                });
            return item;

        }
        public int Insert(EducationLevelAddRequest model)
        {
            int EducationLevelId = 0;
            _prov.ExecuteNonQuery("dbo.EducationLevel_Insert",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Code", model.Code);
                    paramCollection.AddWithValue("@LevelOfEducation", model.LevelOfEducation);
                    paramCollection.AddWithValue("@DisplayOrder", model.DisplayOrder);
                    paramCollection.AddWithValue("@Inactive", model.Inactive);
                    paramCollection.AddWithValue("@UserId", 1);

                    SqlParameter idParameter = new SqlParameter("@Id", SqlDbType.Int);
                    idParameter.Direction = ParameterDirection.Output;
                    paramCollection.Add(idParameter);
                },
                returnParameters: delegate (SqlParameterCollection param)
                {
                    Int32.TryParse(param["@Id"].Value.ToString(), out EducationLevelId);
                });
            return EducationLevelId;
        }
        public void Update(EducationLevelUpdateRequest model, int Id)
        {
            _prov.ExecuteNonQuery("dbo.EducationLevel_Update",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", Id);
                    paramCollection.AddWithValue("@Code", model.Code);
                    paramCollection.AddWithValue("@LevelOfEducation", model.LevelOfEducation);
                    paramCollection.AddWithValue("@DisplayOrder", model.DisplayOrder);
                    paramCollection.AddWithValue("@Inactive", model.Inactive);
                }
                );
        }
        public void Delete(int id)
        {
            _prov.ExecuteNonQuery("dbo.EducationLevel_Delete",
                inputParamMapper: delegate (SqlParameterCollection paramCollection)
                {
                    paramCollection.AddWithValue("@Id", id);
                }
            );
        }
    }

}
