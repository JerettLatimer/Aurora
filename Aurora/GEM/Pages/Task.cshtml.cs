using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GEM.Model;
using HtmlTags;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace GEM
{
    public class TaskModel : PageModel
    {
        private Site Routers { get; } = Fetcher.Instance.Survey;
        HtmlTag table, headerRow;
        public HtmlTag generateTable()
        {
            table = new HtmlTag("table").AddClass("table");
            headerRow = new HtmlTag("tr");

            headerRow.Add("th").Text("ID");
            headerRow.Add("th").Text("CGR Name");
            headerRow.Add("th").Text("Status");
            headerRow.Add("th").Text("Latitude");
            headerRow.Add("th").Text("Longitude");
            table.AppendHtml(headerRow.ToHtmlString());

            foreach (Geodata router in Routers.Sites)
            {
                HtmlTag row = new HtmlTag("tr");
                row.Add("td").Text(router._id.ToString());
                row.Add("td").Text(router.name);
                if(router.status.Equals("online"))
                {
                    row.Add("td").Text(router.status).Style("color", "green");
                }
                else if(router.status.Equals("offline"))
                {
                    row.Add("td").Text(router.status).Style("color", "red");

                }
                row.Add("td").Text(router.location.coordinates.latitude.ToString());
                row.Add("td").Text(router.location.coordinates.longitude.ToString());
                table.AppendHtml(row.ToHtmlString());
            }
            return table;
        }

        public void OnGet()
        {

        }
    }
}