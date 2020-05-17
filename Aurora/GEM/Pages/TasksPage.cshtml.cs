using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using GEM.Model;
using HtmlTags;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace GEM
{
    public class TasksPageModel : PageModel
    {
        readonly Site _survey = Fetcher.GetGeodataListAsync().Result;
        HtmlTag _table, _headerRow;


        //public HtmlTag BuildRules()
        //{
        //    _table = new HtmlTag("table").AddClass("table");
        //    //_headerRow = new HtmlTag("tr");

        //    //_headerRow.Add("th").Text("ID");
        //    //_headerRow.Add("th").Text("CGR Name");
        //    //_headerRow.Add("th").Text("Status");
        //    //_headerRow.Add("th").Text("Latitude");
        //    //_headerRow.Add("th").Text("Longitude");
        //    //_table.AppendHtml(_headerRow.ToHtmlString());

        //    foreach (PropertyInfo property in _survey.Properties) {
        //        var row = new HtmlTag("tr").AddClass("fieldRow");

        //        row.Add("")
        //        row.Add("td").AddClass("").Text(property.Name);
        //        row.Add("td").Text(router.name);
        //        if (router.status.Equals("online")) {
        //            row.Add("td").Text(router.status).Style("color", "green");
        //        }
        //        else if (router.status.Equals("offline")) {
        //            row.Add("td").Text(router.status).Style("color", "red");
        //        }
        //        else {
        //            row.Add("td").Text(router.status).Style("color", "orange");
        //        }
        //        row.Add("td").Text(router.location.coordinates.latitude.ToString());
        //        row.Add("td").Text(router.location.coordinates.longitude.ToString());
        //        _table.AppendHtml(row.ToHtmlString());
        //    }
        //    return _table;
        //}

        public void OnGet()
        {

        }
    }
}