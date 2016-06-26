package com.file.service.imp;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.file.dao.FileDao;
import com.file.entity.TFile;
import com.file.service.FileService;

@Service
public class FileServiceImp implements FileService{
	
	@Resource
	private FileDao  fileDao;

	public void addFile(TFile record) {
		// TODO Auto-generated method stub
		fileDao.addFile(record);
	}
	
	

}
