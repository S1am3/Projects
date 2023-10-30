package com.example.calculator;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        EditText number1TXT = findViewById(R.id.number1TXT);
        EditText number2TXT = findViewById(R.id.number2TXT);
        Button addBTN = findViewById(R.id.addBTN);
        Button subBTN = findViewById(R.id.subBTN);
        Button multBTN = findViewById(R.id.mulBTN);
        Button divBTN = findViewById(R.id.divBTN);
        TextView output = findViewById(R.id.outputTXT);

        addBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                double num1 = Double.valueOf(String.valueOf(number1TXT.getText()));
                double num2 = Double.valueOf(String.valueOf(number2TXT.getText()));
                double answer = num1+num2;
                output.setText(String.valueOf(answer));
            }
        });
        subBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                double num1 = Double.valueOf(String.valueOf(number1TXT.getText()));
                double num2 = Double.valueOf(String.valueOf(number2TXT.getText()));
                double answer = num1-num2;
                output.setText(String.valueOf(answer));
            }
        });
        multBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                double num1 = Double.valueOf(String.valueOf(number1TXT.getText()));
                double num2 = Double.valueOf(String.valueOf(number2TXT.getText()));
                double answer = num1*num2;
                output.setText(String.valueOf(answer));
            }
        });
        divBTN.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                double num1 = Double.valueOf(String.valueOf(number1TXT.getText()));
                double num2 = Double.valueOf(String.valueOf(number2TXT.getText()));
                double answer = num1/num2;
                output.setText(String.valueOf(answer));
            }
        });

    }
}