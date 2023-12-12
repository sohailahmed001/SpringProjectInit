package com.tendo.SpringInit.exception;

public class NotFoundException extends Exception
{
    public NotFoundException(String objName)
    {
        super(objName + " not found !!");
    }
}
