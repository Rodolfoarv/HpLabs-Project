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
 *$ g++ -std=c++11 your_file.cpp -o your_program

or

$ g++ -std=c++0x your_file.cpp -o your_program
 */

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

void Generator::generate_files(){
  //int upper_bound = std::numeric_limits<int>::max();
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

  // Note that we could actually add into the Hash the contents of the file to optimize this
  // However in order to respect the structure of the program and to not have a Hash full of items
  // we will read the file as the user requests it in the read_file method, this will also
  // make the reading more efficient since we will check if the hashmap already containts the key

  cout << "Generation step is complete." << endl;
}

void Generator::read_file(const string& name)
{
  std::string _contents;
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
  std::cout << _contents;

}

Generator::Generator(){

}

Generator::~Generator(){

}

int main(int argc, char ** argv)
{
  Generator files = Generator();
  files.generate_files();
  files.read_file("1.txt");

}
