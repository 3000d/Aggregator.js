import processing.net.*;

final String IP_ADDRESS = "127.0.0.1";
final int PORT = 14240;

Client client;
String dataIn;

void setup() {
    size(800, 600);
    client = new Client(this, IP_ADDRESS, PORT);
}

void draw() {
  if(client.available() > 0) {
    print(client.readChar());    
  }
}


void exit() {
  client.stop();  
}

