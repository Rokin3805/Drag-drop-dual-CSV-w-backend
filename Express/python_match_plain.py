import sys
import time

#get the CSV data for suspects and customers
suspect_data = sys.argv[1].split('\n')
customer_data = sys.argv[2].split('\n')

#example plain text matching funtion (python code should be implemented to match DS teams actual methodology)
def find_matches(suspect_data, customer_data):


    #append tuples into array of matches with enumerated index value also indicating line (in suspect file) where match was found
    matches = []
    for i, suspect_line in enumerate(suspect_data):
        for j, customer_line in enumerate(customer_data):
            if suspect_line == customer_line:
                matches.append((i, suspect_line))
    return matches


#mark time, run function, compute time taken
start_time = time.time() 
matches = find_matches(suspect_data, customer_data)
end_time = time.time() 
execution_time = end_time - start_time


#output the line index and data for each match (using tuples, again, methodology should be changed to match DS team)
output = [f"Match found at line {match[0]}: {match[1]}" for match in matches]
print(output)
print(execution_time)
