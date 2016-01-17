#include <Servo.h>

int input = 0;

Servo servo1;
Servo servo2;

int servo1Pin = 9;
int servo2Pin = 10;

int angle = 90;

void setup()
{
  servo1.attach(servo1Pin);  // attaches the servo on pin 9 to the servo object
  servo2.attach(servo2Pin);

  Serial.begin(9600);

  servo1.write(180);
  servo2.write(180);
}

void loop() 
{ 
  if (Serial.available() > 0) {
    input = Serial.read();  
    action(input);
  }
  delay(15);
} 

void action(int input){
  Serial.print("Got: ");
  Serial.println(input);
  if (input == 97){
    while(angle > 0){
      angle -= 10;
      servo1.write(angle);
      servo2.write(angle);
    }
    delay(100);
    while(angle < 180){
      angle -= 10;
      servo1.write(angle);
      servo2.write(angle);
    }
  }
}
