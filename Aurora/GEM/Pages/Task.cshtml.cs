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
        // List property will be reference to Fetcher
        public List<List<string>> TestList { get; set; } = new List<List<string>>();

        internal void fillList()
        {
            for (int i = 0; i < 5; i++)
            {
                TestList[i].Add("Header");
                for (int j = 0; j < 10; j++)
                {
                    TestList[i].Add("data");
                }
            }
        }

        /*
         * For each column, inject html column with name value and keys below it.
         * Do the same thing for each row.
         */

        public HtmlTag addTableHeader()
        {
            HtmlTag header = new HtmlTag("th");
            header.Text("Here is a header");
            return header;
        }

        public HtmlTag addTableRow()
        {
            HtmlTag row = new HtmlTag("tr");
            return row;
        }

        public HtmlTag generateTable()
        {
            HtmlTag table = new HtmlTag("tb");
            for (int i = 0; i < 5; i++)
            {
                for (int j = 0; j < 10; j++)
                {
                    table.Add("tr")
                        .Add("th")
                        .Text(TestList[i][j]);
                }
            }
            return table;
        }

        public void OnGet()
        {

        }
    }
}