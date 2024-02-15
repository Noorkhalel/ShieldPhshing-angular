import { Component } from '@angular/core';
import {Clipboard} from '@angular/cdk/clipboard';
@Component({
  selector: 'app-apis',
  templateUrl: './apis.component.html',
  styleUrls: ['./apis.component.scss']
})
export class ApisComponent {
  constructor(private clipboard: Clipboard) {

  }

  
  copypythonCode() {
    this.clipboard.copy(`
    import requests

    url = "http://SafeSiteDetect.com/api/v1/Ai/Check"

    payload = {
        "url": "https://www.example.com/",
        "secretkey": "your_api_key"
    }

    headers = {
        "Content-Type": "application/json",
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 200:
        json_data = response.json()
        print("API Response:", json_data)
    else:
        print(f"Error: {response.status_code}")
        print("Error Details:", response.text)
  `);
  }

  copyJsonCode() {
    this.clipboard.copy(`{
      "data":{
          "country": "Toronto, Ontario, CA",
          "description": "The URL is legitimate",
          "hostname": "www.example.com",
          "ip_address": "172.67.38.181",
          "online": "Yes",
          "url": "https://www.example.com/",
          "verified": "Yes"
          }
      }`);
  }
}