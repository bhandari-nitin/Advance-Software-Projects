package com.example.nsb.assignment6;

import android.content.Intent;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.Button;

public class MainActivity extends AppCompatActivity {
        Button login, register;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        login = (Button)findViewById(R.id.Login1);
        register = (Button)findViewById(R.id.register);


    }

    public void onClickOfLoginButton(View v) {
        //This code redirects the from main page to the maps page.
        Intent redirect = new Intent(MainActivity.this, Home.class);
        startActivity(redirect);
    }

    public void onClickOfRegisterButton(View v) {
        //This code redirects to the photo activity.
        Intent redirect = new Intent(MainActivity.this, register.class);
        startActivity(redirect);
    }
}
