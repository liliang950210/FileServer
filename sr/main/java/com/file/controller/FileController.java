package com.file.controller;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import com.file.service.FileService;
import com.file.util.Constant;
import com.file.util.Message;



@Controller
@RequestMapping("/file")
public class FileController {
	
	@Resource
	private FileService fileService;
	
	@RequestMapping("upload")
	@ResponseBody
	 public Object upload(HttpServletRequest request,
	            HttpServletResponse response) throws IOException {
	               // 这里我用到了jar包
	        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
	                request.getSession().getServletContext());
	        if (multipartResolver.isMultipart(request)) {
	            MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
	 
	            Iterator<String> iter = multiRequest.getFileNames();
	            while (iter.hasNext()) {
	                MultipartFile file = multiRequest.getFile((String) iter.next());
	                if (file != null) {
	                    String fileName = file.getOriginalFilename();
	                    if(fileName.equalsIgnoreCase("")){
	                    	return Message.getMessage(0, "文件为空！","");
	                    }
	                    String path2= Thread.currentThread()
	                            .getContextClassLoader().getResource("").getPath();
//	                            + "download" + File.separator;
	                   int now = path2.indexOf("WEB-INF");
	                   System.out.println(path2.substring(0, now));
	                   path2 = path2.substring(0,now);
	                    System.out.println(">>>>>>>>>>"+path2);
	                    
	                    String path1="file/"+new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+fileName.substring(fileName.lastIndexOf("."));
	                    //  下面的加的日期是为了防止上传的名字一样
//	                    String path = path1
//	                            + new SimpleDateFormat("yyyyMMddHHmmss")
//	                                    .format(new Date()) + fileName;
	                    String path = path2+path1;
	 
	                    File localFile = new File(path);
	                    System.out.println(path);
	                    file.transferTo(localFile);
	                    Map<String, Object> map = new HashMap<String, Object>();
	                    map.put("path", path1);
	                    return Message.getMessage(1, "", map);
	                }
	 
	            }
	           
	        }

	        return Message.getMessage(0, "文件为空！","");
	 
	    }
	@RequestMapping("/upload2")
	@ResponseBody
	public Object upload(@RequestParam MultipartFile file ){
		System.out.println("i'm heere!");
		String fileName = file.getOriginalFilename();
		System.out.println(fileName+">>>>>>>>>>>>>>");
		try{
//			if(fileName.exists())
//	            return  Message.getMessage(0, "文件不存在", "");
//		FileInputStream in = new FileInputStream(file);
			String path2= Thread.currentThread()
                    .getContextClassLoader().getResource("").getPath();
//                    + "download" + File.separator;
           int now = path2.indexOf("WEB-INF");
           System.out.println(path2.substring(1, now));
           path2 = path2.substring(1,now);
            System.out.println(">>>>>>>>>>"+path2);
            
            String path1="file/"+new SimpleDateFormat("yyyyMMddHHmmss").format(new Date())+fileName.substring(fileName.lastIndexOf("."));
            //  下面的加的日期是为了防止上传的名字一样
//            String path = path1
//                    + new SimpleDateFormat("yyyyMMddHHmmss")
//                            .format(new Date()) + fileName;
            String path = path2+path1;
        
        File file2 = new File(path);
        file .transferTo(file2);
//        if(!file2.exists()){
//        	file2.createNewFile();
//        }
//        FileOutputStream out=new FileOutputStream(file2);
//        int c;
//        byte buffer[]=new byte[1024];
//        while((c=in.read(buffer))!=-1) {
//            for(int i=0;i<c;i++)
//                out.write(buffer[i]);        
//        }
//        in.close();
//        out.close();
        String url = Constant.Url+path1;
		return Message.getMessage(1,"",url);
		}catch(Exception e){
			e.printStackTrace();
			return Message.getMessage(0, "上传失败", "");
		}
	}

}
