// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.
// Write your Javascript code.


function RadioConditionCheck() {
    for (var radio in $(".condition").children) {
        if (radio.checked) {
            if (radio === document.getElementById("anyChnage")) {
                console.log("inside anyChnage");
            }
        }
    }
}



/* Task and Subscription page 'Create New' text button */
$(".cancel").hide();
$(document).ready(function () {
    $("#newTask").click(function () {
        $(".createToggle").hide();
        $(".menubar_applyColumn").hide();
        $(".cancelToggle").show();
        $(".menubar_tasknameColumn").show();
        $(".menubar_saveColumn").show();
    });
    $("#cancelTask").click(function () {
        $(".cancelToggle").hide();
        $(".menubar_tasknameColumn").hide();
        $(".menubar_saveColumn").hide();
        $(".createToggle").show();
        $(".menubar_applyColumn").show();
    });
});



/* Rule checkbox toggle for show/hide of radio buttons */
$(".fieldCondition").hide();
function toggleConditions(prop) {
    if ($(".rule" + prop).is(":checked")) {
        $(".condition" + prop).show(300);
    }
    else {
        $(".condition" + prop).hide(200);
    }
};



/* Custom Dropdowns */
// Ref: https://codepen.io/hmps/pen/CbltK
$(".dropdownGem .dropdownGem-title").click(function () {
    if ($('.dropdownGem-menu').height() > 0) {
        closeMenu(this);
    } else {
        openMenu(this);
    }
});

$(".dropdownGem-menu li").click(function () {
    closeMenu(this);
});

function closeMenu(el) {
    $(el).closest('.dropdownGem').toggleClass("closed").find(".selection").val($(el).text());
    $('.dropdownGem-menu ul').css("top", 0);
}

function openMenu(el) {
    $(el).parent().toggleClass("closed");
    $('.dropdownGem-menu').css({
        height: 'auto'
    }).mousemove(function (e) {
        var heightDiff = $('.dropdownGem-menu ul').height() / $('.dropdownGem-menu').height(),
            offset = $('.dropdownGem-menu').offset(),
            relativeY = (e.pageY - offset.top),
            top = relativeY * heightDiff > $('.dropdownGem-menu ul').height() - $('.dropdownGem-menu').height() ?
                $('.dropdownGem-menu ul').height() - $('.dropdownGem-menu').height() : relativeY * heightDiff;
        $('.dropdownGem-menu ul').css("top", -top);
    });
}



/* At Submit of Subscription page, this checks to see which rules were selected to stage for placement in Task SelectedRules property */
function submitHandler() {
    var selectedRules = $(".rule_select:checked").map(function () {
        return this.value;
    }).get();
    $('#input_hidden_field_arr').val(JSON.stringify(selectedRules));
}