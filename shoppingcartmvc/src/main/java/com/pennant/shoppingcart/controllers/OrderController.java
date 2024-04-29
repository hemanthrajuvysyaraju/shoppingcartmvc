package com.pennant.shoppingcart.controllers;

import java.io.IOException;
import java.util.Iterator;

import org.json.JSONArray;
import org.json.JSONObject;

import com.pennant.shoppingcart.BLL.CalculateToatalBLL;
import com.pennant.shoppingcart.models.CustomerModel;
import com.pennant.shoppingcart.models.ProductListModel;
import com.pennant.shoppingcart.models.ProductModel;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class OrderController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		response.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		response.addHeader("Access-Control-Allow-Origin", "*");
		JSONObject obj = new JSONObject(request.getParameter("cart"));
		String cust_Id = request.getParameter("id");
		ProductListModel productsInCart= new ProductListModel();
		Iterator<String> keysitr = obj.keys();
		CustomerModel customer = new CustomerModel();
		customer.setCust_Id(Integer.parseInt(cust_Id));
		keysitr.forEachRemaining(key->
		{
			ProductModel product = new ProductModel();
			JSONArray array=(JSONArray) obj.get(key);
			product.setProd_Id(Integer.valueOf((String)array.get(0)));
			product.setProd_Qty(Integer.valueOf((String)array.get(3)));
			product.setProd_Price(Double.valueOf((String)array.get(4)));
			productsInCart.add(product);
		});
		CalculateToatalBLL.doProcess(productsInCart);
	}

}
