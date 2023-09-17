// ignore_for_file: file_names, library_private_types_in_public_api, prefer_final_fields, use_key_in_widget_constructors, prefer_const_constructors, avoid_print

import 'package:flutter/material.dart';
import 'package:clinic/models/clinicAdd.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ClinicEditPage extends StatefulWidget {
  final int clinicId;

  const ClinicEditPage({required this.clinicId});

  @override
  _ClinicEditPageState createState() => _ClinicEditPageState();
}

class _ClinicEditPageState extends State<ClinicEditPage> {
  final _formKey = GlobalKey<FormState>();
  ClinicAdd _clinic = ClinicAdd();
  TextEditingController _nameController = TextEditingController();
  TextEditingController _descriptionController = TextEditingController();
  TextEditingController _contactEmailController = TextEditingController();
  TextEditingController _contactNumberController = TextEditingController();
  TextEditingController _cityController = TextEditingController();
  TextEditingController _streetController = TextEditingController();
  TextEditingController _postalCodeController = TextEditingController();
  TextEditingController _buildingNumberController = TextEditingController();

  @override
  void dispose() {
    _nameController.dispose();
    _descriptionController.dispose();
    _contactEmailController.dispose();
    _contactNumberController.dispose();
    _cityController.dispose();
    _streetController.dispose();
    _postalCodeController.dispose();
    _buildingNumberController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();
    fetchClinicDetails(widget.clinicId);
  }

  Future<void> fetchClinicDetails(int id) async {
    try {
      final response = await http.get(
        Uri.parse('https://localhost:7137/api/clinic/$id'),
      );

      if (response.statusCode == 200) {
        final jsonData = json.decode(response.body);

        setState(() {
          _clinic = ClinicAdd.fromJson(jsonData);
        });

        _nameController.text = _clinic.name;
        _descriptionController.text = _clinic.description;
        _contactEmailController.text = _clinic.contactEmail;
        _contactNumberController.text = _clinic.contactNumber;
        _cityController.text = _clinic.city;
        _streetController.text = _clinic.street;
        _postalCodeController.text = _clinic.postalCode;
        _buildingNumberController.text = _clinic.buildingNumber;
      } else {
        print('Failed to fetch clinic details');
      }
    } catch (e) {
      print('Error fetching clinic details: $e');
    }
  }

  Future<void> saveClinicDetails() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      ClinicAdd clinic = ClinicAdd(
        name: _nameController.text,
        description: _descriptionController.text,
        contactEmail: _contactEmailController.text,
        contactNumber: _contactNumberController.text,
        city: _cityController.text,
        street: _streetController.text,
        postalCode: _postalCodeController.text,
        buildingNumber: _buildingNumberController.text,
      );

      try {
        final response = await http.put(
          Uri.parse('https://localhost:7137/api/clinic/${widget.clinicId}'),
          body: json.encode(clinic.toJson()),
          headers: {'Content-Type': 'application/json'},
        );

        if (response.statusCode == 200) {
          print('Klinika została zaktualizowana');
          Navigator.pop(context);
        } else {
          print('Błąd podczas aktualizacji kliniki');
        }
      } catch (e) {
        print('Błąd podczas aktualizacji kliniki: $e');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Edytuj klinikę'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              TextFormField(
                controller: _nameController,
                decoration: const InputDecoration(labelText: 'Nazwa'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać nazwę kliniki';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _descriptionController,
                decoration: const InputDecoration(labelText: 'Opis'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać opis kliniki';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _contactEmailController,
                decoration:
                    const InputDecoration(labelText: 'Email kontaktowy'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać email kontaktowy';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _contactNumberController,
                decoration:
                    const InputDecoration(labelText: 'Numer kontaktowy'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać numer kontaktowy';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _cityController,
                decoration: const InputDecoration(labelText: 'Miasto'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać miasto';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _streetController,
                decoration: const InputDecoration(labelText: 'Ulica'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać ulicę';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _postalCodeController,
                decoration: const InputDecoration(labelText: 'Kod pocztowy'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać kod pocztowy';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _buildingNumberController,
                decoration: const InputDecoration(labelText: 'Numer budynku'),
                validator: (value) {
                  if (value!.isEmpty) {
                    return 'Proszę wpisać numer budynku';
                  }
                  return null;
                },
              ),
              ElevatedButton(
                onPressed: saveClinicDetails,
                child: const Text('Zapisz'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Edycja kliniki',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const ClinicEditPage(clinicId: 1),
    );
  }
}
