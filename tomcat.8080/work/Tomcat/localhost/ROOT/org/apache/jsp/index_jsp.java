/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/8.0.1
 * Generated at: 2017-06-28 00:08:04 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=ISO-8859-1\">\r\n");
      out.write("<title>Personal Finance Dashboard</title>\r\n");
      out.write("<link href=\"css/bootstrap.min.css\" rel=\"stylesheet\">\r\n");
      out.write("<link href=\"css/main-theme.min.css\" rel=\"stylesheet\">\r\n");
      out.write("<link href=\"css/dashboard.css\" rel=\"stylesheet\">\r\n");
      out.write("<link href=\"css/toastr.min.css\" rel=\"stylesheet\">\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\t<div class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r\n");
      out.write("\t\t<div class=\"container\">\r\n");
      out.write("\t\t\t<div class=\"navbar-header\">\r\n");
      out.write("\t\t\t\t<button type=\"button\" class=\"navbar-toggle\" data-toggle=\"collapse\"\r\n");
      out.write("\t\t\t\t\tdata-target=\".navbar-collapse\">\r\n");
      out.write("\t\t\t\t\t<span class=\"sr-only\">Toggle navigation</span> <span\r\n");
      out.write("\t\t\t\t\t\tclass=\"icon-bar\"></span> <span class=\"icon-bar\"></span> <span\r\n");
      out.write("\t\t\t\t\t\tclass=\"icon-bar\"></span>\r\n");
      out.write("\t\t\t\t</button>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t\t<a class=\"navbar-brand text-center center-block\" href=\"#\">Personal Finance Dashboard</a>\r\n");
      out.write("\t\t\t<div class=\"collapse navbar-collapse\">\r\n");
      out.write("\t\t\t\t<ul class=\"nav navbar-nav\">\r\n");
      out.write("\t\t\t\t\t<li class=\"active\">\r\n");
      out.write("\t\t\t\t\t\t<a href=\"index.jsp\">\r\n");
      out.write("\t\t\t\t\t\t<span class=\"glyphicon glyphicon glyphicon-log-in\"></span>&nbsp;&nbsp;\r\n");
      out.write("\t\t\t\t\t\t\tSign-In\r\n");
      out.write("\t\t\t\t\t\t</a>\r\n");
      out.write("\t\t\t\t\t</li>\r\n");
      out.write("\t\t\t\t</ul>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t\t<!--/.nav-collapse -->\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<div class=\"loading\"></div>\r\n");
      out.write("\t<div class=\"container\">\r\n");
      out.write("\t\t<div class=\"starter-template\">\r\n");
      out.write("\t\t\t<h3>Dashboard Login</h3>\r\n");
      out.write("\t\t\t<div id=\"app\" class=\"col-md-6 col-md-offset-3\">\r\n");
      out.write("\t\t\t<hr/>\r\n");
      out.write("\t\t\t<!-- <button id=\"signInBtn\" class=\"btn btn-default\">Authenticate</button> -->\r\n");
      out.write("\t\t\t<form id=\"form\">\r\n");
      out.write("\t\t\t\t<div class=\"form-group\">\r\n");
      out.write("\t\t\t\t\t<label for=\"email\">Email: </label>\r\n");
      out.write("\t\t\t\t\t<input class=\"form-control\" id=\"email\" type=\"text\">\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t<div class=\"form-group\">\r\n");
      out.write("\t\t\t\t\t<label for=\"password\">Password: </label>\r\n");
      out.write("\t\t\t\t\t<input class=\"form-control\" id=\"password\" type=\"password\">\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t<div class=\"alert alert-warning\" style=\"display:none;padding:10px;\"\r\n");
      out.write("\t\t\t\trole=\"alert\">Email and password required!</div>\r\n");
      out.write("\t\t\t\t<div class=\"alert alert-danger\" style=\"display:none;padding:10px;\"\r\n");
      out.write("\t\t\t\trole=\"alert\"></div>\r\n");
      out.write("\t\t\t\t<button class=\"btn btn-default btn-sm\" type=\"submit\">Sign-In</button>&nbsp;\r\n");
      out.write("\t\t\t\t<button class=\"btn btn-default btn-sm\" id=\"signInGoogle\">\r\n");
      out.write("\t\t\t\t\t<img src=\"img/google-icon.svg\" height=\"15px\" width=\"15px\"/>\r\n");
      out.write("\t\t\t\t\t&nbsp;Google Sign-In\r\n");
      out.write("\t\t\t\t</button>\r\n");
      out.write("\t\t\t</form>\r\n");
      out.write("\t\t\t<hr/>\r\n");
      out.write("\t\t\t\t<div class=\"row\">\r\n");
      out.write("\t\t\t\t\t<label for=\"register\">Need to register?&nbsp;</label>\r\n");
      out.write("\t\t\t\t\t<button class=\"btn btn-default btn-sm\" id=\"register\">Register Now</button>\r\n");
      out.write("\t\t\t\t\t<br/>\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t\t<div class=\"row\" id=\"dashboardMain\" style=\"display: none\">\r\n");
      out.write("\t\t\t\t<div class=\"col-sm-12 main\">\r\n");
      out.write("\t\t\t\t\t<div class=\"page-header\">\r\n");
      out.write("\t\t\t\t\t  <center><h2>Overview of Finances</h2></center>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t<center><button id=\"runReport\" class=\"btn btn-primary\">Run Report</button></center>\r\n");
      out.write("\t\t\t\t\t\t<div class=\"row\">\r\n");
      out.write("\t\t\t\t\t\t\t<div id=\"mainReport\" class=\"col-sm-12 main\" style=\"display:none\">\r\n");
      out.write("\t\t\t\t\t\t\t<h4>Condition: \r\n");
      out.write("\t\t\t\t\t\t\t\t<span id=\"conditionLabel\" class=\"label label-success\">Satisfactory</span>\r\n");
      out.write("\t\t\t\t\t\t\t</h4>\r\n");
      out.write("\t\t\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t\t</div>\t\t\t\t\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t</div>\r\n");
      out.write("\t<!-- /.container -->\r\n");
      out.write("\t\r\n");
      out.write("\t<!-- Footer -->\r\n");
      out.write("\t<div class=\"navbar navbar-default navbar-fixed-bottom footer\">\r\n");
      out.write("\t</div>\r\n");
      out.write("\t\r\n");
      out.write("\t<!-- Dialog -->\r\n");
      out.write("\t<div id=\"dialog\" title=\"Notification\">\r\n");
      out.write("  \t\t<p id='dialogContent'></p>\r\n");
      out.write("\t</div>\r\n");
      out.write("    \r\n");
      out.write("\t<!-- Scripts and dependencies -->\r\n");
      out.write("\t<script src=\"js/scripts/jquery-3.1.0.min.js\"></script>\r\n");
      out.write("\t<script src=\"js/scripts/bootstrap.min.js\"></script>\r\n");
      out.write("\t<script src=\"https://www.gstatic.com/firebasejs/4.1.2/firebase.js\"></script>\r\n");
      out.write("\t<script src=\"https://www.gstatic.com/firebasejs/4.1.2/firebase-app.js\"></script>\r\n");
      out.write("\t<script src=\"https://www.gstatic.com/firebasejs/4.1.2/firebase-auth.js\"></script>\r\n");
      out.write("\t<script src=\"https://www.gstatic.com/firebasejs/4.1.2/firebase-database.js\"></script>\r\n");
      out.write("\t<script src=\"js/scripts/toastr.min.js\"></script>\r\n");
      out.write("\t<script src=\"js/firebase/config.js\"></script>\r\n");
      out.write(" \t<script src=\"js/Screens/authentication/login.js\"></script>\r\n");
      out.write(" \t<script src=\"js/confighelper/confighelper.js\"></script>\r\n");
      out.write("\t<script>\r\n");
      out.write("\t$('.navbar li').click(function(e) {\r\n");
      out.write("\t    $('.navbar li.active').removeClass('active');\r\n");
      out.write("\t    var $this = $(this);\r\n");
      out.write("\t    if (!$this.hasClass('active')) {\r\n");
      out.write("\t        $this.addClass('active');\r\n");
      out.write("\t    }\r\n");
      out.write("\t    e.preventDefault();\r\n");
      out.write("\t});\r\n");
      out.write("\t</script>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
