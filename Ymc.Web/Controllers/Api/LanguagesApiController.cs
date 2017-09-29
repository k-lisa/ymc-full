using Ymc.Models.Domain;
using Ymc.Models.Responses;
using Ymc.Models.Requests;
using Ymc.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Ymc.Web.Controllers.Api
{   [RoutePrefix("api/language")]
    public class LanguagesApiController : ApiController
    {
        ILanguageService _svc;

        public LanguagesApiController(ILanguageService svc)
        {
            _svc = svc;
        }


        [Route]
        [HttpGet]
        public HttpResponseMessage Get()
        {
            ItemsResponse<Language> response = new ItemsResponse<Language>();
            response.Items = _svc.Get();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route][HttpPost]
        public HttpResponseMessage Post(LanguageAddRequest model)
        {
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = _svc.Post(model);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route ("{Id}")][HttpGet]
        public HttpResponseMessage GetById(int Id)
        {
            ItemResponse<Language> response = new ItemResponse<Language>();
            response.Item = _svc.GetById(Id);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("{Id:int}")]
        [HttpPut]
        public HttpResponseMessage Put(LanguageUpdateRequest model, int id)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
            _svc.Update(model, id);
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = id;
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("{Id:int}")][HttpDelete]
        public HttpResponseMessage Delete(int Id)
        {
            _svc.Delete(Id);
            ItemResponse<int> response = new ItemResponse<int>();
            response.Item = Id;
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }

    }
}
