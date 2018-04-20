package com.restservices;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONString;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.WebResource;

@Path("/flickrapi/{item}")
public class FlickrApi {
	
	@GET
	@Produces("application/json")
	public Response imagesearch(@PathParam("item") String item) throws JSONException {
		
		String output = null;
		String output2 = null;
		int farm = 0;
		String id = null;
		String secret = null;
		String server = null;
		String name = null;
		double price = 0;
		double itemId = 0;
		
		try {
			Client client = Client.create();
			WebResource web = client.resource("https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4605dbc7335582d5dae239562aca6906&text="+item+"&per_page=1&format=json&nojsoncallback=1");
			WebResource wb = client.resource("http://api.walmartlabs.com/v1/search?query="+item+"&format=json&apiKey=xpcqmfg6p8tk5dk658nz6q2n&numItems=1&sort=bestseller");
			
			ClientResponse response = web.accept("application/json").get(ClientResponse.class);
			ClientResponse rsp = wb.accept("application/json").get(ClientResponse.class);
			
			output = response.getEntity(String.class);
			output2 = rsp.getEntity(String.class);
			
			JSONObject json = new JSONObject(output);
			JSONObject t = json.getJSONObject("photos");
			JSONArray photo = t.getJSONArray("photo");
			
			for (int i=0;i<photo.length();i++)
			{
				System.out.println("www"+photo.length());
				farm =  photo.getJSONObject(i).getInt("farm");
				id =  photo.getJSONObject(i).getString("id");
				server =  photo.getJSONObject(i).getString("server");
				secret =  photo.getJSONObject(i).getString("secret");
				
				System.out.println("farm:" + farm);
				System.out.println("Id:" + id);
				System.out.println("Server:" + server);
				System.out.println("Secret:" + secret);
			}
			
			JSONObject i = new JSONObject(output2);
			JSONArray j = i.getJSONArray("items");
			System.out.println(j);
			name = j.getJSONObject(0).getString("name");
			price = j.getJSONObject(0).getDouble("msrp");
			itemId = j.getJSONObject(0).getDouble("itemId");
			
			
			
			System.out.println("farm:" + farm);
			System.out.println("Id:" + id);
			System.out.println("Server:" + server);
			System.out.println("Secret:" + secret);
			
			System.out.println("Name:" + name);
			System.out.println("Msrp:" + price);
			System.out.println("ItemId:" + itemId);
			
					} catch (Exception e) {
		}
		
		JSONObject j1 = new JSONObject();
		j1.put("farm", new Integer(farm));
		j1.put("name", name);
		j1.put("price",price);
		j1.put("itemId", itemId);
		j1.put("id", id);
		j1.put("secret", secret);
		j1.put("server", server);
		System.out.println(j1);
		return Response.status(200).entity(j1.toString()).build();
		
	

	}
}
