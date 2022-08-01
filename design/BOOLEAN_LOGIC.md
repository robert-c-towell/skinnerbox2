# Boolean Logic

* Expression ()
* Logical Operators && || !
* Comparison Operators != = < <= > >= e !e
* Math Operators + - * / %
* Ternary Operator ? : 
* Value can be a string, another variable, or a regular expression

```
if (<variable> <comparison operator> <value>)

if ((<variable> <comparison operator> <value>) <logical operator> (<variable> <comparison operator> <value> ))

if (<[Item|Inventory|Room|Player|Etc].variable> )

"conditions": [["PLATERS_IN_ROOM", ">", 1], "or", [[{ "object": ["ITEM", "29829a"], "prop": "size" }, ">", 3], "and", [{ "object": ["ITEM", "48928942"], "prop": "inventory"}, "!e"]]]
```