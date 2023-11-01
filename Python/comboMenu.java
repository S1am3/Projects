import java.util.Scanner;

class comboMenu {
  // https://www.geeksforgeeks.org/java-program-to-check-if-a-given-integer-is-positive-or-negative/
  // Function to check number is positive or negative
  static int checkPosNeg(int x)
  {
      // inbuilt signum function
      int ans = Integer.signum(x);
      return ans;
  }
  
  public static void main(String[] args) {
    Scanner ui = new Scanner(System.in);
    // String user = "y";
    double total = 0;
    //check if all three == true then -$1
    boolean orderedSandwich = false;
    boolean orderedFries = false;
    boolean orderedDrink = false;

    //build string
    StringBuilder orderSummary = new StringBuilder();

    boolean keepOrdering = true;
    //while loop to keep ordering
    while(keepOrdering){
      System.out.println("Do you want to order something? (y/n)");
      String user = ui.nextLine();
      if (user.equals("n")) {
        keepOrdering = false; //out loop
        break; // break loop
      }
      // buffer
      // ui.nextLine();
    
      System.out.println("Do you want a Sandwich? (y/n)");
      user = ui.nextLine();
      if(user.equals("y")){
        System.out.println("What sandwich would you like (tofu-$5.75 Chicken-$5.25 Beef-$6.25)!");
        String order = ui.nextLine();
        if(order.equals("t")){
          System.out.println("You order Tofu!");
          orderSummary.append("Tofu sandwich, ");
          total+=5.75;
          orderedSandwich = true;
        }
        else if(order.equals("c")){
          System.out.println("You order Chicken");
          orderSummary.append("Chicken sandwich, ");
          total+=5.25;
          orderedSandwich = true;
        }else{
          System.out.println("You order Beef");
          orderSummary.append("Beef sandwich, ");
          total+=6.25;
          orderedSandwich = true;
        }
      }
      
      System.out.println("Would you like some Fries (y/n)");
      user = ui.nextLine();
      if(user.equals("y")){
        System.out.println("Would you like Fries (Small-$1.00 Medium-$1.75 Large-$2.25");
        String order = ui.nextLine();
        if(order.equals("s")){
          System.out.println("You order Small Fries");
          orderSummary.append("Small Fries, ");
          total+=1.00;
          orderedFries = true;
        } else if(order.equals("m")){
          System.out.println("You order Medium Fries");
          orderSummary.append("Medium Fries, ");
          total+=1.75;
          orderedFries = true;
        }else{
          System.out.println("You order Large Fries");
          orderSummary.append("Large Fries, ");
          total+=2.25;
          orderedFries = true;
        }
      }
  
        System.out.println("Would you like some drink (y/n)");
        user = ui.nextLine();
        if(user.equals("y")){
          System.out.println("What size of Drink (Small-$1.00 Medium-$1.50 Large-$2.00)");
          String order = ui.nextLine();
          if(order.equals("s")){
            System.out.println("You order Small Drink");
            orderSummary.append("Small Drink, ");
            total+=1.00;
            orderedDrink = true;
          } else if(order.equals("m")){
            System.out.println("You order Medium Drink");
            orderSummary.append("Medium Drink, ");
            total+=1.50;
            orderedDrink = true;
          }else{
            System.out.println("Would you like to upgrade to a Child size for $0.38? (y/n)");
            user = ui.nextLine();
            if(user.equals("y")){
              System.out.println("You order a Child size drink");
              orderSummary.append("Child size Drink, ");
              total+=2.38;
              orderedDrink = true;
            }else{
              System.out.println("You order Large Drink");
              orderSummary.append("Large Drink, ");
              total+=2.00;
              orderedDrink = true;
            } 
          }
        }
      

      //as if want ketchup
      System.out.println("World you like ketchup? (y/n)");
      user = ui.nextLine();
      if(user.equals("y")){
        System.out.println("How many ketchup packets do you want? (Each $0.25) Enter a number: ");
        int order = ui.nextInt();
        //use checkPosNeg to see if it is neg or pos
        int ket = checkPosNeg(order);
        while(ket != 1){
          System.out.println("How many ketchup packets do you want? (Each $0.25) Enter a number: "); 
          order = ui.nextInt();
        }
        System.out.printf("You ordered %d Ketchup Packets\n",order);
        //append to stringbuilder
        orderSummary.append(order).append(" Ketchup Packets, ");
        total+=(order*0.25);
        ui.nextLine(); // stop Do you want a sandwich from printing the sametime as Do you want to order something
        
      }
      // true or false to stop loop
      // System.out.println("Are you done ordering? (y/n)");
      // user = ui.nextLine();
      // if(user.equals("y")){
      //   keepOrdering = false;
      // }
    }

  // Check if the user has ordered all three items and apply the discount
  if (orderedSandwich && orderedFries && orderedDrink) {
      total -= 1.00; // Apply the $1.00 discount
  }
  // System.out.println(total);
  //if stringbuild string is greater the zero do stuff at bottom
  if (orderSummary.length() > 0) {
  double tax = total*0.07;
  System.out.printf("\nTotal tax: $%.2f\n",tax);
  System.out.printf("subtotal: $%.2f\n",total);
  System.out.printf("Total: $%.2f",total+tax);

  // Print the user's order summary
  System.out.println("\n\nOrder Summary:");
  System.out.println(orderSummary.toString());
  }
  }
}
