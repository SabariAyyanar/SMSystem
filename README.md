## SMSystem

SMSystem is a name of the school management system we created. It is used to manage 
information relating to school such as students,employees,payroll and student examinations.

<ul>
  <li>PREREQUISITE</li>
   <li>SETUP</li>
   <li>FILES</li>
   <li>CONRIBUTORS</li>
   <li>LICENSE</li>
   <li>COPYRIT</li>
</ul>

## PROJECTS 
This Applicaton was created using Angular,Node js , C# and SQL Database
It contains 5 projects. The following are the description for the Projects:
  <ol>
            <li> 
                   <h3> C# PROJECTS: <h3>
                      <h4> Application.User.View </h4>
                      <p>
                        This contains the application controlllers and oauth for authenticating. Controllers
                        are specific to each entities like employee,students and fees.
                      </p>
                     <h4>BUSINESS ENTITY<h4>
                      <p>
                        This c# class library contains all the classes for the application. Classes relating to employees,
                        students, fees, monetary and application specific can be found here. Each classes is characterize for 
                        database operations using appropriate system annotations.
                      </p>
                     <h4>Application.Repository</h4>
                      <p>
                        This contains all the database operations. It contains middleware called unitofwork to separate 
                        database manipulation from the controller. I returns IEnumerable instead of a list to prevent people
                        from tampering or quering directly form entity framework.
                        The applicaton also has plutocontext for creating tables,stored procedures and appropriate relations.
                        It also has plutodbcontext for seeding the application with some defaults data before the application 
                        start running.
                      </p>                
          </li>  
          <li>
                      <h3> ANGULAR PROJECT </h3>
                      <p>                        
                        This projecct contains all the user interface and typescript. It is use to 
                        display relevant data to the end user. It contains modules,components,directives
                        and services. Components are kept in their own folders. Services and modules 
                        are also kept in their own folders. All typescript classses are kept in
                        the models folder. The application is bootstrap using the app component.                        
                      </p>
        </li>                        
        <li>
                      <h3>NODE PROJECT</h3>
                      <p> 
                        This projecct contains all the external helpers for the application. It is use to 
                        display store and send relevant information. It logs error and also is used to 
                        write and save data to file. It saves school biodata and also other files for the 
                        application.
                      </p>        
       </li>          
  </ol>


## PREREQUISITE 
  <ol>
      <li>Visual Studio</li>
      <li>Node js</li>
      <li>Angular CLI</li>
      <li>Internet</li>
  </ol>
  
## SETUP

  <ol>
    <li>Open the Smsytem vs project in visual studio and install the required package formm package.json
    </li>
    <li>Build and run the Visual studio applicaiotion. Make sure Application.User.View is also running.
    </li>
    <li>Open the Angular Folder and navigate to SMSyste/Applicaiton.View and open command prompt from the window.
    Then install the angular dependencies. Then type in NG SERVE to start the angular server
    </li>
    <li>Open the Node Folder and open command prompt from there. Type in Nodemon to start the node server.
    </li>
    <li>Make sure the visual studion , Angular and Node server is running. Go To LOCALHOST:4200      
    </li>
    <li>Default database will be created with the name SAMPLE and defaults values will be inserted into it.
     Login using the defaults username and password SA and SA (username and password in lower case) 
    </li>
  </ol>

## CONTRIBUTORS

  <ol>
    <li>Quofi Ansah - Web and Desktop Developer
    </li>
    <li>Sir Steven - Database and Web Developer
    </li>
 </ol>

## ACKNOWLEDGEMENT

<ol>
    <li>MR. FORSON (Accountant) - Giving us books, knowledge and skills needed to start this project
    </li>
</ol>

## LICENSE

LICENSE UNDER [MIT LICENSE](LICENSE)

## COPYRIGHT

(c) KSoftNet Inc. 2017.
