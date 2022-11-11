import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

public class Test {
    public static void main(String[] args) {
        ArrayList<Double> list = new ArrayList<>();
        
        HashMap<String, Integer> map = new HashMap<>();
        
        for (Double i = 0.0; i < 1000; i++) {
            list.add(i);
        }

        slidingWindow(list);
    }

    public static List<String> getInactive(List<String> users, List<String> active) {
        ArrayList<String> inactiveUsers = new ArrayList<>();
        Set<String> activeSet = new HashSet<>(active);

        for (String user : users) {
            if (activeSet.add(user)) inactiveUsers.add(user);
        }
        return inactiveUsers;
    }

    public static ArrayList<Double> slidingWindow(ArrayList<Double> data) {
        ArrayList<Double> filtered = new ArrayList<>();
        int n = data.size();

        int iCounter = 0;
        int jCounter = 0;
        for (int i = 0; i < n; i++) {
            iCounter++;
            int low = Math.max(0, i-5);
            int hi = Math.min(n-1, i+5);
            double sum = 0.0;
            for (int j = low; j <= hi; j++) {
                sum += data.get(j);
                jCounter++;
            }
            double avg = sum / (hi-low+1);
            filtered.add(avg);
        }
        System.out.println("data.size: " + data.size() + " filtered: " + filtered.size() + " og i: " + iCounter + " og j " + jCounter);
        return filtered;
    }

    public static <T> void moveFirst(ArrayList<T> list, ArrayList<T> toMove) {
        int n = list.size();
        // int k = toMove.size();

        for (int i = 0; i < n; i++) { // n
            T elem = list.get(i); // 1
            if (toMove.contains(elem)) { // n
                list.remove(i); // n
                list.add(0, elem); // n
            }
        }
    }
}