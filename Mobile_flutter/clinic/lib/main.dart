// ignore_for_file: prefer_const_constructors

import 'package:clinic/views/home.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Przychodnia',
      theme: ThemeData(
        colorScheme:
            ColorScheme.fromSeed(seedColor: Color.fromARGB(255, 24, 255, 255)),
        // useMaterial3: true,
      ),
      home: HomePage(),
    );
  }
}
