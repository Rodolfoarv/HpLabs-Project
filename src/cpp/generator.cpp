/*
 *
 * Copyright (c) 2016.
 * Hewlett Packard Enterprise.
 * All rights reserved.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
 * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *

 */

// Author: Rodolfo Andrés Ramírez Valenzuela


#include <iostream>
#include <fstream>
#include <functional>
#include <algorithm>
#include <sstream>
#include <random>
#include <vector>
#include <string>
#include <random>
#include "generator.h"



using namespace std;

//Function provided by the requirements
string Generator::join( vector<float>& elements, string delimiter )
{
    stringstream ss;
    size_t elems = elements.size(),
           last = elems - 1;

    for( size_t i = 0; i < elems; ++i )
    {
        ss << elements[i];

        if( i != last )
            ss << delimiter;
    }

    return ss.str();
}
//Function provided by the requirements
void Generator::generate_files(){
  if (files_generated){
    return;
  }
  //  upper_bound = std::numeric_limits<int>::max();
  int upper_bound = 1000;

  random_device rd;
  mt19937 gen(rd());
  normal_distribution<float> gaussian_dist(0.0,1.0);
  auto gaussian_generator = std::bind(gaussian_dist, gen);
  vector<float> vec(1000, 0.0);

  for (int i=0; i< upper_bound; i++) {
      std::generate(vec.begin(), vec.end(),gaussian_generator);
      string histogram = join(vec, ",");

      std::ofstream fs(std::to_string(i) + ".txt");
      if(!fs)
      {
          cout <<"ERROR: can not open/create file [" << i << ".txt]" << endl;

      }

      fs<< i << "\t" << histogram;
      fs.close();
  }
  files_generated = true;

  // Note that we could actually add into the Hash the contents of the file to optimize this
  // However in order to respect the structure of the program and to not have a Hash full of items
  // we will read the file as the user requests it in the read_file method, this will also
  // make the reading more efficient since we will check if the hashmap already containts the key,
  // if it does, then we will dispatch the request with the value of the key.

  cout << "Generation step is complete." << endl;
}

//Function that reads a file the client requests, it receives the name as parameter
//and returns the contents as a result
string Generator::read_file(const string& name)
{

  //Validate if the hash contains the file already
  if (files.find(name) != files.end()){
    std::cout << "map already contains this key!" << name << endl; // return the vector
    return files[name];
  }
  string _contents;
	// Open the file
	std::fstream input(name, std::fstream::in);

	// Parse file
	if (input.is_open())
	{
  #ifdef _DEBUG
  		std::cout << "File " << name << " opened." << std::endl;
  #endif

		std::stringstream buffer;
		buffer << input.rdbuf();
		_contents = buffer.str();

		// Close file
		input.close();
	}

  if (_contents == "") return "";

  //Get the contents of the file without the name
  string chart = _contents.substr(2);
  files[name] = chart;
  return chart;

}

// Function that will combine two charts, the user requests, returns the contents of the two files
string Generator::combine_charts(const string& c1, const string& c2){
  string data1 = read_file(c1);
  string data2 = read_file(c2);
  if (data1 == "" || data2 == ""){
    return "";
  }
  return read_file(c1).substr(0, data1.size() - 1 ) + "," + read_file(c2);
}

// Constructor of the Generator class
Generator::Generator(){
  files_generated = false;
}

//Destructor of the Generator class
Generator::~Generator(){
}
