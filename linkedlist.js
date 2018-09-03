(function(){
  "use strict";
  class Node {
    constructor (nodeElement){
      this.data = nodeElement;
      this.link = null;
    }
  }

  class LinkedList {
    constructor(){
      this.head = null;
      this.sizeOfList = 0;
    }
  }

  LinkedList.prototype.add = function(data) {
    let node= new Node(data);
    let current = this.head;

    if(!current){
      this.head= node;
      this.sizeOfList++;
      return node;
    }

    while(current.link){
      current = current.link;
    }
    current.link = node;
    this.sizeOfList++;

    return node;
  };

  LinkedList.prototype.printList = function() {
    if(this.sizeOfList == 0){
      console.log("Empty list");
      return;
    }
    let i = 1;
    let list = this.head;
    while(list){
      console.log(list.data);
      list = list.link;
      i++;
    }
    console.log();
  }

  LinkedList.prototype.mergeList = function(list1, list2) {
    let head1 = list1.head;
    let head2 = list2.head;

    if(!head1 && !head2){
      console.log("Both list are empty");
      return;
    }

    while(head1 && head2) {
      if(head1.data <= head2.data){
        this.add(head1.data);
        head1 = head1.link;
      } else {
        this.add(head2.data);
        head2 = head2.link;
      }
    }
    if(!head1){
      while(head2){
        this.add(head2.data);
        head2 = head2.link;
      }
    }
    if(!head2){
      while(head1){
        this.add(head1.data);
        head1 = head1.link;
      }
    }
  };

  let ll1  = new LinkedList();
  ll1.add(5);
  ll1.add(10);
  ll1.add(15);
  ll1.printList();
  

  let ll2 = new LinkedList();
  ll2.add(1);
  ll2.add(6);
  ll2.add(8);
  ll2.printList();

  let ll3 = new LinkedList();
  ll3.mergeList(ll1, ll2);
  ll3.printList();
})();