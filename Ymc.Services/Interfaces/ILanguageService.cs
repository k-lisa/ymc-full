using System.Collections.Generic;
using Ymc.Models.Domain;
using Ymc.Models.Requests;

namespace Ymc.Services
{
    public interface ILanguageService
    {
        void Delete(int Id);
        List<Language> Get();
        Language GetById(int Id);
        int Post(LanguageAddRequest model);
        void Update(LanguageUpdateRequest model, int Id);
    }
}