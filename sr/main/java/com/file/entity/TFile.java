package com.file.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name="t_file")
public class TFile {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="file_id")
	private Integer fileId;
	@Column(name="upload_time")
	private Timestamp uploadTime;
	@Column(name="project_name")
	private String 	projectName;
	@Column(name="path")
	private String path;
	public Integer getFileId() {
		return fileId;
	}
	public void setFileId(Integer fileId) {
		this.fileId = fileId;
	}
	public Timestamp getUploadTime() {
		return uploadTime;
	}
	public void setUploadTime(Timestamp uploadTime) {
		this.uploadTime = uploadTime;
	}
	public String getProjectName() {
		return projectName;
	}
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	
	 
	
	

}
