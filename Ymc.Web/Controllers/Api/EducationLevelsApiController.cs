using Ymc.Models.Domain;
using Ymc.Models.Requests;
using Ymc.Models.Responses;
using Ymc.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Ymc.Web.Controllers.Api
{
    [RoutePrefix("api/EducationLevels")]
    public class EducationLevelsApiController: ApiController
    {
        EducationLevelService _svc;

        public EducationLevelsApiController(EducationLevelService svc)
        {
            _svc = svc;
        }
        [Route, HttpGet]
        public HttpResponseMessage Get()
        {
            ItemsResponse<EducationLevel> response = new
                ItemsResponse<EducationLevel>();
            response.Items = _svc.Get();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("{id}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            ItemResponse<EducationLevel> response = new
                ItemResponse<EducationLevel>();
            response.Item = _svc.GetById(id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route, HttpPost]
        public HttpResponseMessage Post(EducationLevelAddRequest model)
        {
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = _svc.Insert(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);

        }
        [Route("{id}"), HttpPut]
        public HttpResponseMessage Update(EducationLevelUpdateRequest model, int id)
        {
            _svc.Update(model, id);
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = id;
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("{id}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            _svc.Delete(id);
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = id;
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
    }
}