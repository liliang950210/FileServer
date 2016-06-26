package com.file.dao.Imp;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.file.dao.FileDao;
import com.file.entity.TFile;

@Repository
public class FileDaoImp implements FileDao{
	
	@Autowired
	private SessionFactory sessionFactory;
	
	Session getSession(){
		return sessionFactory.getCurrentSession();
	}

	public void addFile(TFile record) {
		// TODO Auto-generated method stub
		getSession().save(record);
	}

}
