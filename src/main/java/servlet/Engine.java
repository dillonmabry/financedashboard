package servlet;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Scanner;
import java.util.concurrent.TimeUnit;
import java.util.jar.Attributes;
import java.util.jar.Manifest;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * Servlet implementation class Engine
 */
@WebServlet("/AppEngine")
public class Engine extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public Engine() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		if (request.getParameter("oper").equals("getVersion")) {
			String version, environment = null;
			try {
				ServletContext application = getServletConfig().getServletContext();
				InputStream inputStream = application.getResourceAsStream("/META-INF/MANIFEST.MF");
				Manifest manifest = new Manifest(inputStream);
				Attributes attr = manifest.getMainAttributes();
				version = attr.getValue("Manifest-Version");
				environment = attr.getValue("Environment");
				response.getWriter().write(environment + " " + version);
			} catch (IOException e) {
				e.printStackTrace();
			}	
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
	}
	


}
