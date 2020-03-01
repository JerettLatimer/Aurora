using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HtmlTags;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace GEM
{
    public class TaskModel : PageModel
    {
        // List property will be reference to Fetcher data property
        public List<List<string>> TestList { get; set; } = new List<List<string>>();

        internal void fillList()
        {
            for (int i = 0; i < 5; i++)
            {
                TestList.Add(new List<string>());
                TestList.ElementAt(i).Add("HEADER");
                for (int j = 0; j < 10; j++)
                {
                    TestList.ElementAt(i).Add("data");
                }
            }
        }

        public HtmlTag generateTable()
        {
            this.fillList();
            HtmlTag table = new HtmlTag("table");
            HtmlTag headerRow = new HtmlTag("tr");
            HtmlTag dataRow = new HtmlTag("tr");
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    if(j == 0)
                    {
                        headerRow.Add("th")
                            .Text(TestList.ElementAt(i).ElementAt(j));
                    }
                    else
                    {
                        dataRow.Add("td")
                            .Text(TestList.ElementAt(i).ElementAt(j));
                    }
                }
            }
            table.AppendHtml(headerRow.ToHtmlString());
            table.AppendHtml(dataRow.ToHtmlString());
            return table;
        }

        public void OnGet()
        {

        }
    }
}