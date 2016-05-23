{
  "targets": [
    {
      "target_name": "generator",
      "sources": [ "generator.cpp" , "generator_node.cpp" ],
      "cflags": ["-Wall", "-std=c++11"],
      'xcode_settings': {
        'OTHER_CFLAGS': [
          '-std=c++11'
        ],
      },
      'msvs_settings': {
        'VCCLCompilerTool': {
          'ExceptionHandling': 1 # /EHsc
        }
      },
      'configurations': {
        'Release': {
          'msvs_settings': {
            'VCCLCompilerTool': {
            'ExceptionHandling': 1,
          }
        }
      }
      },
      "conditions": [
        [ 'OS=="mac"', {
            "xcode_settings": {
                'OTHER_CPLUSPLUSFLAGS' : ['-std=c++11','-stdlib=libc++'],
                'OTHER_LDFLAGS': ['-stdlib=libc++'],
                'MACOSX_DEPLOYMENT_TARGET': '10.7' }
            }
        ]
      ]
    }
  ]
}
