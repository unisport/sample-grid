/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package forunisportserverdraft;

import com.sun.net.httpserver.Headers;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;
import java.io.BufferedInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

/**
 *
 * @author Pranit
 */
public class ForUnisportServerDraft {

    static int port = 8080;
    static String ip = "127.0.0.1";
    //a static variable works without there being an instance of the class
    //static classes are similar
    static String publicFolder = "src/public/";

    public void run() throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(ip, port), 0);
    //eventual REST Routes

        //HTTP Server Routes
        
        //access to home page 127.0.0.1:8080/pages/index.html
        server.createContext("/pages", new RequestForAFileHandler());
        //need to run this file first!!!!it serves for the backend
        server.start();

    }

    public static void main(String[] args) throws IOException {

        if (args.length >= 3) {
            {
                port = Integer.parseInt(args[0]);
                ip = args[1];
                publicFolder = args[2];
            }

        }

        //don't consider using this as a web server for a large project
        //createContext is a Java way of handling roots like welcome or pages
        //the first parameter is a root(a folder)
        //the second parameter is a event handler
        //we dont have a request and response object
        new ForUnisportServerDraft().run();
        System.out.println("Started the server on " + port + " port " + ip + " ip address, referring public folder " + publicFolder);
    }

    private static class RequestForAFileHandler implements HttpHandler {

        public RequestForAFileHandler() {
        }

        @Override
        public void handle(HttpExchange he) throws IOException {

            String requestedFile = he.getRequestURI().toString();
            //THEN WE EXTRACT THE FILE 
            String f = requestedFile.substring(requestedFile.lastIndexOf("/") + 1);
            //THEN WE ALLOW EXTENSIONS
            String extension = f.substring(f.lastIndexOf("."));
            String mime = "";
            switch (extension) {
                case ".pdf":
                    mime = "application/pdf";
                    break;
                case ".png":

                    mime = "image/png";
                    break;
                case ".html":
                    mime = "text/html";
                    break;
                case ".jar":
                    mime = "application/java-archive";
                    break;
                case ".docx":
                    mime = "document/text";
                    break;
                case ".txt":
                    mime = "document/text";
                    break;

            }
            //FOLLOWING we create a new file to read derived from the path
            File file = new File(publicFolder + f);
            byte[] bytesToSend = new byte[(int) file.length()];
            String errorMsg = null;
            int responseCode = 200;
            try {
                BufferedInputStream bis = new BufferedInputStream(new FileInputStream(file));
                bis.read(bytesToSend, 0, bytesToSend.length);
            } catch (IOException ie) {
                errorMsg = "<h1>Not Found</h1>No context found for request";
            }
            if (errorMsg == null) {
                Headers h = he.getResponseHeaders();
                h.set("Content-Type", mime);
            } else {
                responseCode = 404;
                bytesToSend = errorMsg.getBytes();

            }
            he.sendResponseHeaders(responseCode, bytesToSend.length);
            try (OutputStream os = he.getResponseBody()) {
                os.write(bytesToSend, 0, bytesToSend.length);
            }

        }

    }
};
