package com.sportify.app.dto.request;

/**
 * Author: Paras Dongre
 * Date Created:30-01-2025
 * Time Created:23:32
 */
public class UpdateUserRequest {

    private String userName;
    private String address;
    private long mobileNo;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public long getMobileNo() {
        return mobileNo;
    }

    public void setMobileNo(long mobileNo) {
        this.mobileNo = mobileNo;
    }
}
