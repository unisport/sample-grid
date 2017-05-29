<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <link href="css/bootstrap-theme.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/StyleSheet.css" rel="stylesheet" />
    <title></title>
</head>
<body>
    <form id="form1" runat="server">
    <div>

       

          <!-- Navigation -->
    <div class="container">

                <div class="row">

  <asp:Repeater ID="SubRepeater" runat="server" >
  <ItemTemplate>
                    <div class="col-sm-4 col-lg-4 col-md-4">
                        <div class="thumbnail">

                            <div class="img_border text-center">
                            <img src='<%# Eval("img_url") %>' alt=""></div>
                            <div class="caption">
                                <h4 class="pull-right"> <%# pricecorrect(Convert.ToString(Eval("price")),  Convert.ToString(Eval("price_old")) )  %></h4>
                                <h4><a href='<%# Eval("url") %>'><%# Eval("name") %></a>
                                </h4></div>
                            
                            <div class="ratings">
                                <p class="pull-right">15 reviews</p>
                                <p>
                                   <span><%# Eval("sizes").ToString().PadRight(30).Substring(0,30).TrimEnd()%>...</span>
                                </p>
                            </div>
                        </div>
                    </div>

                   
  </ItemTemplate>
</asp:Repeater>

               </div>

          </div>


    </div>
    </form>
</body>
</html>
