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

#include <iostream>
#include <fstream>
#include <functional>
#include <algorithm>
#include <sstream>
#include <random>
#include <vector>
#include <string>
#include <random>

using namespace std;

string join( vector<float>& elements, string delimiter )
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

int main(int argc, char ** argv)
{
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
            return 1;
        }

        fs<< i << "\t" << histogram;
        fs.close();
    }

    cout << "Generation step is complete." << endl;
}
