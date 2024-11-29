# Ldap-server

You can add user with command: 

```
ldapadd -x -D "cn=root" -w secret -H ldap://localhost:1389 -f ldif/new_user.ldif
```

After that you can search users: 

```
ldapsearch -x -H ldap://localhost:1389 -b "dc=example,dc=com" "(uid=newuser)"
```

