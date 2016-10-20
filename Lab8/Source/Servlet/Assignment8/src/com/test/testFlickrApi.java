package com.test;

import static org.junit.Assert.*;
import javax.ws.rs.core.Response;
import org.json.JSONObject;
import org.junit.Test;
import com.restservices.FlickrApi;
import org.junit.Test;

public class testFlickrApi {

		FlickrApi f = new FlickrApi();
		String[]  d = new String[10];
		d = f.imagesearch();
		
		@Test
		public void test() {
		if (d==null)
		{
			System.out.println("There's an error");
		}
		if(d!=null)
		{
			for (int i=0;i<=d.length;i++)
			{
				Object laptop;
				if( d==laptop)
				{
					System.out.println("Sucess");
				}
				else
				{
					System.out.println("Fail");
				}
			}
		}
	}

}