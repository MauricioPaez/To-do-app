sudo apt update

# MySql

# 1. Install MySql server
sudo apt install mysql-server

# 2. Start MySql service
sudo systemctl start mysql.service

# 3. Configure
mysql -sfu root < "mysql_secure_installation.sql"

# 4. Load Schema
mysql -u root -p to-do-schema < schema.sql

# 5. Install Java
sudo apt install default-jre

# 6. Run Spring Project
cd /backend
mvn spring-boot:run

# 7. Install web app dependencies
cd ../react-app
npm install

# 8. Run project
npm run start