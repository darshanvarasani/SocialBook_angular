function validate()
{
    return (checkPass() && checkUsername());
}

function checkUsername()
{
    var username=document.forms["login"]["username"];
    var Temail=/^[a-zA-Z0-9]+@[a-zA-Z]+.[a-z]{2,3}$/;
    if(username.value=="")
    {
        document.getElementById("username-tr").style.removeProperty("display");
        username.focus();
        return false;
    }
    else if(!(username.value).match(Temail))
    {
        document.getElementById("username-tr1").style.removeProperty("display");
        username.focus();
        return false;
    }
    else
    {
        document.getElementById("username-tr").style.setProperty("display","none");
        document.getElementById("username-tr1").style.setProperty("display","none");
        return true;
    }
}

function checkPass()
{
    var pass=document.forms["login"]["pass"];
    if(pass.value=="")
    {
        document.getElementById("pass-tr").style.removeProperty("display");
        pass.focus();
        return false;
    }
    else
    {
        document.getElementById("pass-tr").style.setProperty("display","none");
        return true;
    }
}