package com.varunK.crud.contoller;

import com.varunK.crud.models.User;
import com.varunK.crud.repository.UsersRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/")
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {
    @Autowired
    private UsersRepo usersRepo;

    @PostMapping("register")
    public ResponseEntity<HttpStatus> createUser(@RequestBody User user){
        try{
            if(this.usersRepo.existsById(user.getUsername()) || user.getUsername() == null || user.getUsername() == "" || user.getPassword() == null || user.getPassword() == "")
                return new ResponseEntity<HttpStatus>(HttpStatus.NOT_ACCEPTABLE);
            else if(this.usersRepo.save(user) != null){
                return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
            }
            else
                return new ResponseEntity<HttpStatus>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        catch (Exception e){
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("login")
    public ResponseEntity<HttpStatus> loginUser(@RequestBody User user){
        try{
            if(usersRepo.findByUsernameAndPassword(user.getUsername(),user.getPassword()) != null){
                return new ResponseEntity<HttpStatus>(HttpStatus.ACCEPTED);
            }
            else
                return new ResponseEntity<HttpStatus>(HttpStatus.NOT_FOUND);
        }
        catch (Exception e){
            return new ResponseEntity<HttpStatus>(HttpStatus.BAD_REQUEST);
        }
    }
}
