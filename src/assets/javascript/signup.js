function validate()
{
    if(checkFname() && checkLname() && checkEmail() && checkPass() && checkCPass() && checkDOB() && checkProfile())
    {
        return true;
    }
    else
    {
        return false;
    }
}

function checkFname()
{
    var fname=document.forms["signup"]["fname"];
    var Tfname=/^[a-zA-Z]+$/;
    if(fname.value=="")
    {
        document.getElementById("fname-tr").style.removeProperty("display");
        fname.focus();
        return false;
    }
    else if(!(fname.value).match(Tfname))
    {
        document.getElementById("fname-tr1").style.removeProperty("display");
        fname.focus();
        return false;
    }
    else
    {
        document.getElementById("fname-tr").style.setProperty("display","none");
        document.getElementById("fname-tr1").style.setProperty("display","none");
        return true;
    }
}

function checkLname()
{
    var lname=document.forms["signup"]["lname"];
    var Tlname=/^[a-zA-Z]+$/;
    if(lname.value=="")
    {
        document.getElementById("lname-tr").style.removeProperty("display");
        lname.focus();
        return false;
    }
    else if(!(lname.value).match(Tlname))
    {
        document.getElementById("lname-tr1").style.removeProperty("display");
        lname.focus();
        return false;
    }
    else
    {
        document.getElementById("lname-tr").style.setProperty("display","none");
        document.getElementById("lname-tr1").style.setProperty("display","none");
        return true;
    }
}

function checkEmail()
{
    var email=document.forms["signup"]["email"];
    var Temail=/^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]{2,3}$/;
    if(email.value=="")
    {
        document.getElementById("email-tr").style.removeProperty("display");
        email.focus();
        return false;
    }
    else if(!(email.value).match(Temail))
    {
        document.getElementById("email-tr1").style.removeProperty("display");
        email.focus();
        return false;
    }
    else
    {
        document.getElementById("email-tr").style.setProperty("display","none");
        document.getElementById("email-tr1").style.setProperty("display","none");
        return true;
    }
}

function checkPass()
{
    var pass=document.forms["signup"]["pass"];
    var Tpass=/^[a-zA-Z0-9]{8,16}$/;
    if(pass.value=="")
    {
        document.getElementById("pass-tr").style.removeProperty("display");
        pass.focus();
        return false;
    }
    else if(!(pass.value).match(Tpass))
    {
        document.getElementById("pass-tr1").style.removeProperty("display");
        pass.focus();
        return false;
    }
    else
    {
        document.getElementById("pass-tr").style.setProperty("display","none");
        document.getElementById("pass-tr1").style.setProperty("display","none");
        return true;
    }
}

function checkCPass()
{
    var pass=document.forms["signup"]["pass"];
    var cpass=document.forms["signup"]["cpass"];
    if(cpass.value!=pass.value)
    {
        document.getElementById("cpass-tr").style.removeProperty("display");
        cpass.focus();
        return false;
    }
    else
    {
        document.getElementById("cpass-tr").style.setProperty("display","none");
        return true;
    }
}

function checkDOB()
{
    var dob=document.forms["signup"]["dob"];
    if(dob.value=="")
    {
        document.getElementById("dob-tr").style.removeProperty("display");
        dob.focus();
        return false;
    }
    else
    {
        document.getElementById("dob-tr").style.setProperty("display","none");
        return true;
    }
}

function checkProfile()
{
    var profile=document.forms["signup"]["profilepic"];
    if(profile.value=="" || profile.value==null)
    {
        document.getElementById("profile-tr").style.removeProperty("display");
        profile.focus();
        return false;
    }
    else
    {
        document.getElementById("dob-tr").style.setProperty("display","none");
        return true;
    }
}