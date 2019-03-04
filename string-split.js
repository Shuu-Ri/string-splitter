/**
 * By YinTing.
 * 
 * The mechanism will get the input string and splitter values (array).
 * In the initial state, the mechanism will check if the first splitter value in the input string
 * and return the result in the type of string[] which will be the variable splitted_str.
 * For the sub-sequence splitter values, the mechanism will check each item in the splitted_str array.
 * If found, the splitted values of type string[] will be returned. 
 * The mechanism will determine the location of checking input (array item) and replace the item with the 
 * splitted values returned.
 * 
 * Limitation: 
 * 1. Case sensitive of the splitter values does matter.
 * 2. Not in an optimization case. 
 *      For eg, a user typed two similar splitter values. 
 *      The system will run twice to check the availability of splitter values in the input string.
 * 3. Complexity of the code (3 for loops involved). Still can't think of a better way on that.
 * 4. Not check on the performance speed. It might be slow.
 */
module.exports = {
    str_split: function(in_str, splitter_val){
        this.a_split_val = "";
        var splitted_str;
        var total_word_count = in_str.length;

        for(var num=0; num<splitter_val.length; num++){
            // Ignoring optimizing case when two splitter values are the same
            this.a_split_val = splitter_val[num];
            
            // The initial input string
            if(num===0)
                splitted_str = this.split_process([], total_word_count, 0, in_str);
            else{
                var input_array = [].concat(splitted_str);
                for(var i=0; i<input_array.length; i++){
                    console.log("Checking INPUT: ", input_array[i]);
                    var temp = this.split_process([], input_array[i].length, 0, input_array[i]);
                    // array substitution...
                    // Returned temp array with size 1 not always means no changes.
                    // So, compare the first array with the input string to check whether both are the same.
                    if(temp[0]!=input_array[i]){
                        var prev_elem_index = 0;
                        temp.forEach(function(element, elem_index) {
                            if(elem_index===0)
                                splitted_str.splice(splitted_str.indexOf(input_array[i]),1,element);
                            else
                                splitted_str.splice(prev_elem_index+1,0,element);

                            prev_elem_index = splitted_str.indexOf(element);
                        }, this);
                    }
                    console.log("STR: ",splitted_str);
                }
            }
        }
        return splitted_str;
    },
    split_process: function(result, num_words_left, start_pt, input_str){
        console.log("======================================");
        if(num_words_left===0){
            console.log("result: ",result);
            return result;
        }else{
            console.log("Input: ",input_str);
            console.log("splitter: ", this.a_split_val);
            console.log("Start point: ", start_pt);
            var loc_of_splitter = input_str.indexOf(this.a_split_val, start_pt);
            console.log("splitter loc : ", loc_of_splitter);

            // If match found in the input string
            if(loc_of_splitter>-1){
                num_words_left = input_str.length-(loc_of_splitter+this.a_split_val.length);
                if(((input_str.substring(start_pt, loc_of_splitter)))!="")
                    result.push(input_str.substring(start_pt, loc_of_splitter));
                start_pt = loc_of_splitter+this.a_split_val.length;
            }else{
                num_words_left=0;  // No match found. Exit the loop
                result.push(input_str.substring(start_pt, input_str.length));
            }

            return this.split_process(result, num_words_left, start_pt, input_str);
        }
    }
};