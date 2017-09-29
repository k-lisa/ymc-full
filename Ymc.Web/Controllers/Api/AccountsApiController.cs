using Ymc.Models;
using Ymc.Models.Domain;
using Ymc.Models.Requests;
using Ymc.Models.Responses;
using Ymc.Services;
using Ymc.Web.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace Ymc.Web.Controllers.Api
{
    [RoutePrefix("api/accounts")]
    public class AccountsApiController: ApiController
    {
        UserService _svc;
        OwinAuthenticationService _oas;

        public AccountsApiController(UserService svc, OwinAuthenticationService oas)
        {
            _svc = svc;
            _oas = oas;
        }
        [Route("login"), HttpPost]
        public HttpResponseMessage LogIn(LoginRequest model)
        {
            ItemResponse<bool> response = new ItemResponse<bool>();
            response.Item = _svc.LogIn(model.Email, model.Password, model.IsPersistent);
            
            if ( response.Item == true)
            {
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, response);
            }
        }
        [Route("register"), HttpPost]
        public HttpResponseMessage Register(AccountUpsertRequest model)
        {
            _svc.Create(model);
            ItemResponse<int> response = new ItemResponse<int>();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("{email}"), HttpGet]
        public HttpResponseMessage Existing(string email)
        {
            ItemResponse<AccountRegistrationRetrieval> response = new ItemResponse<AccountRegistrationRetrieval>();
            response.Item = _svc.GetName(email);
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("logout"), HttpGet]
        public HttpResponseMessage Logout()
        {
            ItemResponse<IUserAuthData> response = new ItemResponse<IUserAuthData>();
            _oas.LogOut();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }
        [Route("user"), HttpGet]
        public HttpResponseMessage LoggedInUser()
        {
            ItemResponse<IUserAuthData> response = new ItemResponse<IUserAuthData>();
            response.Item = _oas.GetCurrentUser();
            return Request.CreateResponse(HttpStatusCode.OK, response);
        }


    }
}