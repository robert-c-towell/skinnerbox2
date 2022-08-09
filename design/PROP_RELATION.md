## Prop Relation
Each prop storing a list of its children is not sufficient for describing what a scene looks like. Suppose there is a chest with an arrow sticking out of it and a pile of clothes inside. When the player first examines the chest it's description should be something like "An old chest with a broken arrow sticking out of it and a brass lock on the latch", and should make no mention of the contents.



{
    children: [
        {
            relation: "in",
            
        }
    ]
}