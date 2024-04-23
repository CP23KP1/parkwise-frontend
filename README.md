# :car: Parkwise  README

Visit the repository via [Parkwise on Github](https://github.com/CP23KP1/parkwise-frontend)

Visit the Application via [Parkwise](https://capstone23.sit.kmutt.ac.th/kp1/admin)

![Logo](/public/logo/logo-bg.png)

## Table of Contents

1. Requirements for Project Installation
2. Version of Microsoft Word Used
3. Admin Manaual
4. Information of Students

## Requirements for Project Installation

#### 1. Hardware Requirements

To using Parkwise with fully functionallity the devices must have

-   Can access the internet (http/https)
-   Can access [Parkwise](https://capstone23.sit.kmutt.ac.th/kp1/admin) Website
    1.1 Desktop/Laptop
-   OS:WIN/MACOS
-   No specific hardware requirement
    1.2 Mobile
-   OS:Andriod/IOS
-   No specific hardware requirement

#### 2. Software Requirements

-   Text Editor tools (Visual studio version 1.85.1 or later - recommendation)
-   Docker (Latest)
-   Firebase (BaaS - Storage)

#### 3. Library Requirements

3.1 Environment

-   Node.js (version 18.x.x or later)
-   **Frontend**
    -   React.js (version 18.2.0)
    -   Next.js (version 14.0.3)
-   **CSS Framework**
    -   NextUI (version 2.2.9)
    -   Tailwindcss (version 3.3.3)
-   **Database**
    -   MySQL (version 8 or later)
    -   Firebase (version 10.4.0)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Software architecture of Parkwise

![Parkwise-architecture](https://firebasestorage.googleapis.com/v0/b/Parkwise-de5f5.appspot.com/o/common%2Farchitecture.png?alt=media&token=595183dd-96e1-4d09-9696-51803d7b4043)

> Pre-requiresite for running application correctly:

1. First, run the development server:

```bash
# Installation all needed packages
yarn
```

```bash
# Running project
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

2. Enter the key environment to running the project.


# Admin manaual :open_book:

System for system administrators

## 1 Login Registration

### Administrators can log in as follows.

- When entering the website A login page will appear for you to enter your username and password.
- When logging in, the screen will display a menu for managing the system. which has a total of 9 buttons
  - หน้าหลัก
  - ทีจอดรถ
  - เจ้าหน้าที่
  - อุปกรณ์
  - โซน
  - Logs
  - รถยนต์
  - ผู้ดูแล
  - เบอร์ฉุกเฉิน

## 2 Using the main page (หน้าหลัก)

- On the main page, information will be displayed for admins to easily view as follows.
  - รถในระบบ
  - อุปกรณ์ในระบบทั้งหมด
  - โซน
  - ลูกค้า/เจ้าหน้าที่ในระบบ
  - โซนที่มีการใช้งานมากที่สุด ประจำเดือนนี้
  - วันที่มีการใช้งาน ประจำเดือนนี้

## 3 Using the parking (ที่จอดรถ)

- The parking lot will display information about users who have parked their cars. which will show the name, description, number of times parked, parking zone

  ### 3.1 Adding parking

  - Press the add button

    A screen will be displayed to add a parking space.

  - Complete the information as follows
    name, description, number of times parked, parking zone
  - Press add

  ### 3.2 Edit parking

  - Press Edit Parking for the parking you want to edit.

    A pop-up will appear on the parking that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 3.3 Delete parking

  - Press Delete Parking for the parking you want to delete.

    A pop-up will appear on the parking that needs to be delete.

  - Press yes (ใช่)

## 4 Using  User (เจ้าหน้าที่)
- The parking lot will display information about users who have parked their cars. which will show the name, description, number of times parked, parking zone

    ### 4.1 Adding admin

   - Press the add button

     A screen will be displayed to add  user space.

   - Complete the information as follows
 
     First name, Last name, email, phone number ,car image
  - Press add (เพิ่ม)

    
  ### 4.2 Edit user 

  - Press Edit  user  for the  user  you want to edit.

    A pop-up will appear on the  user  that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 4.3 Delete  user 

  - Press Delete  user  for the  user you want to delete.

    A pop-up will appear on the  user that needs to be delete.

  - Press yes (ใช่)

## 5 Using the Equipment/camera (อุปกรณ์)
- On the Devices(Camera) page, information about all connected devices(Camera) will be displayed. It will have the following information: ID, name, description, price, brand, zone

    ### 5.1 Adding camera

   - Press the add button

     A screen will be displayed to add an Equipment/camera  space.

   - Complete the information as follows
 
     Name, description, brand, price, zone 
  - Press add (เพิ่ม)

    
  ### 5.2 Edit Equipment/camera 

  - Press Edit Equipment/camera  for the Equipment/camera you want to edit.

    A pop-up will appear on the Equipment/camera  that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 5.3 Delete Equipment/camera 

  - Press Delete Equipment/camera  for the Equipment/camera  you want to delete.

    A pop-up will appear on the Equipment/camera  that needs to be delete.

  - Press yes (ใช่)

## 6 Using the Zone (โซน)
- On the parking zone page, information will be displayed: name, description, and support for the cars use, number of cars in use, latitude, longitude
    ### 6.1 Adding zone

   - Press the add button

     A screen will be displayed to add a zone space.

   - Complete the information as follows
 
      zone image, name, description, address, support for the cars use, number of cars in use, latitude, longitude
  - Press add (เพิ่ม)

    
  ### 6.2 Edit zone

  - Press Edit zone  for the zone you want to edit.

    A pop-up will appear on the zone  that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 6.3 Delete zone

  - Press Delete zone  for the zone  you want to delete.

    A pop-up will appear on the zone that needs to be delete.

  - Press yes (ใช่)


## 7 Using Logs 
- On the logs page, Shows information about recording the history of entering and exiting cars, which shows the following information: license plate, owner, time, usage status.

## 8 Using  Car (รถยนต์)
- On the parking zone page, information will be displayed: car's license plate, color, brand, model, year, owner
    ### 8.1 Adding cars

   - Press the add button

     A screen will be displayed to add a car

   - Complete the information as follows
 
      car image, owner, car's license plate, Province of registration, color, brand, model, year
  - Press add (เพิ่ม)

    
  ### 8.2 Edit car

  - Press Edit car  for the car you want to edit.

    A pop-up will appear on the car  that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 8.3 Delete car

  - Press Delete car  for the car  you want to delete.

    A pop-up will appear on the car that needs to be delete.

  - Press yes (ใช่)

## 9 Using the admin (ผู้ดูแล)
- The parking lot will display information about users who have parked their cars. which will show the First name, last name, email 

    ### 9.1 Adding admin

   - Press the add button

     A screen will be displayed to add a admin space.

   - Complete the information as follows
 
     First name, Last name, email, password
  - Press add (เพิ่ม)

    
  ### 9.2 Edit admin

  - Press Edit admin for the admin you want to edit.

    A pop-up will appear on the admin that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 9.3 Delete admin

  - Press Delete admin for the admin you want to delete.

    A pop-up will appear on the admin that needs to be delete.

  - Press yes (ใช่)

## 10 Using the emergency number (เบอร์ฉุกเฉิน)
- On the emergency number page, information will be displayed:emergency number, name telephone, number, Usage status

    ### 10.1 Adding emergency number

   - Press the add button

     A screen will be displayed to add an emergency number.

   - Complete the information as follows
 
     emergency number, name telephone, number, Usage status
  - Press add (เพิ่ม)

    
  ### 10.2 Edit emergency number

  - Press Edit emergency number for the emergency number you want to edit.

    A pop-up will appear on emergency number that needs to be edited.

  - Edit what you want to fix.
  - Press save (บันทึก)

  ### 10.3 Delete emergency number

  - Press Delete emergency number for the emergency number you want to delete.

    A pop-up will appear on the emergency number that needs to be delete.

  - Press yes (ใช่)


## Information of Students

Student 1:

-   StudentId: 63130500002
-   Name: Karunpat Promvisut
-   Email: karunat.promvisut@mail.kmutt.ac.th
-   Telephone: 095-469-8230

Student 2:

-   StudentId: 63130500060
-   Name: Thiraphat Itamonchai
-   Email: thiraphat.itamonchai@mail.kmutt.ac.th
-   Telephone: 094-251-4582

Student 3:

-   StudentId: 63130500070
-   Name: Natasia Yusuwapan
-   Email: natasia.09@mail.kmutt.ac.th
-   Telephone: 093-763-5015
