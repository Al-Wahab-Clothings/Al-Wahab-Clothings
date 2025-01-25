[![Typing SVG](https://readme-typing-svg.demolab.com?font=Roboto+Slab&weight=500&size=25&duration=4000&pause=500&color=CFB53B&center=true&vCenter=true&width=665&height=55&lines=%E2%9C%A8Al+Wahab+Clothings%E2%9C%A8;%E2%9C%A8Ecommerce+Store+for+Clothing+Brands%E2%9C%A8;%E2%9C%A8Developed+by+Rida+Naz%E2%9C%A8)](https://git.io/typing-svg)

# AL WAHAB CLOTHINGS - An Ecommerce Store 🛍️

# Pages / Routes 

### 1. 🏠 **Home: (/)**
The landing page that showcases featured products.

### 2. 🛍️ **product: (/product/[1])**
Displays detailed information about a specific product when selected.

### 3. 🛒 **Cart: (/cart)**
View and manage the products added to your shopping cart.

### 4. 📦 **Order: (/order)**
Check the details of your previous or ongoing orders.

### 5. ✅ **Success: (/Success)**
Confirmation page displayed after a successful purchase.

### 6. 🚫 **Not-found: (/something-else)**
Appears when you attempt to access a page that does not exist.

### 7. 🛠️ **Studio: (/studio)**
Admin interface for adding, updating, or managing product data.

# Libraries and Tools

## 1. Frontend

* 🖼️ **React Icons:** Customizable icons for the UI.

* **React Slick:** Carousel for interactive content.

* **Framer Motion:** Fluid animations and transitions.

* 🔔 **React Hot Toast:** Notifications and alerts.

## 2. 🔒 Authentication and Security

* 🔑 **NextAuth:** Secure and flexible authentication.

## 3. State Management

* 🗂️ **Redux Toolkit and Persist:** Centralized state management.

## 4. E-Commerce Integration

* **COD** Submit a form for COD (Cash on Delivery) so that EmailJs will automatically send confirmation email to the user.

## 5. Backend and Database

* **Sanity CMS:** Content management.

* **Drizzle ORM:** Simplified database interaction.

* 🛢️ **Neon Postgres:** Seamless database hosting.

## 6. Utilities

* **Radix UI Slot:** Advanced slot management.

* **is-hotkey:** Keyboard shortcuts handling.

## 7. ✉️ Email Integration

* 📧 **EmailJS:** It supports customer inquiries and order confirmations without requiring a backend. The integration ensures secure and fast email delivery using predefined templates.

## 8. 📊 Google Analytics

* 📈 **Google Analytics 4 (GA4):** Integrated to track and analyze user interactions with the website, monitor traffic, conversions, email send to customers and overall website performance.

# 🛠️ Installtions

```bash
1. npm install react-icons
2. npm install next*-auth
3. npm i react-slick
4. npm i --save-dev @types/react-slick
5. npm install slick-carousel
6. npm i framer-motion
7. npm install @emailjs/browser
8. npx shadcn-ui@latest init
9. npx shadcn-ui@latest add button
10. npm create sanity@latest -- --project 6605qrxk --dataset production --template clean 
11. npm install --save-dev @types/is-hotkey
12. npm i react-hot-toast
13. npm install @reduxjs/toolkit react-redux
14. npm i redux-persist
15. npm i @stripe/stripe-js
16. openssl rand -base64 32  #for generating next_auth_secret & use this command in `git bash`
18. npm i @vercel/postgres
17. npm install drizzle-orm --force
18. npm install @radix-ui/react-slot
19. npm i -D drizzle-kit
20. npm add -D pg @next/env
21. npm install @neondatabase/serverless
22. npm install postgres
23. npm install @portabletext/react
```