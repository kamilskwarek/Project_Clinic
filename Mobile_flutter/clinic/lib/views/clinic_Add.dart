// ignore_for_file: avoid_print, prefer_const_constructors, use_key_in_widget_constructors, prefer_const_constructors_in_immutables, library_private_types_in_public_api, use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'clinics.dart';

class ClinicAddPage extends StatefulWidget {
  final Function refreshClinics;

  ClinicAddPage({required this.refreshClinics});

  @override
  _ClinicAddPageState createState() => _ClinicAddPageState();
}

class _ClinicAddPageState extends State<ClinicAddPage> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _contactEmailController = TextEditingController();
  final TextEditingController _contactNumberController =
      TextEditingController();
  final TextEditingController _cityController = TextEditingController();
  final TextEditingController _streetController = TextEditingController();
  final TextEditingController _postalCodeController = TextEditingController();
  final TextEditingController _buildingNumberController =
      TextEditingController();

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
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Dodaj Klinikę'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Form(
          key: _formKey,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              TextFormField(
                controller: _nameController,
                decoration: InputDecoration(
                  labelText: 'Nazwa',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać nazwę kliniki';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _descriptionController,
                decoration: InputDecoration(
                  labelText: 'Opis',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać opis kliniki';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _contactEmailController,
                decoration: InputDecoration(
                  labelText: 'Email kontaktowy',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać email kontaktowy';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _contactNumberController,
                decoration: InputDecoration(
                  labelText: 'Numer kontaktowy',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać numer kontaktowy';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _cityController,
                decoration: InputDecoration(
                  labelText: 'Miasto',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać miasto';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _streetController,
                decoration: InputDecoration(
                  labelText: 'Ulica',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać ulicę';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _postalCodeController,
                decoration: InputDecoration(
                  labelText: 'Kod pocztowy',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać kod pocztowy';
                  }
                  return null;
                },
              ),
              TextFormField(
                controller: _buildingNumberController,
                decoration: InputDecoration(
                  labelText: 'Numer budynku',
                ),
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Proszę podać numer budynku';
                  }
                  return null;
                },
              ),
              SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: () {
                  if (_formKey.currentState!.validate()) {
                    _formKey.currentState!.save();
                    saveClinic();
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => ClinisPage()),
                    );
                  }
                },
                child: Text('Zapisz'),
              ),
            ],
          ),
        ),
      ),
    );
  }

  void saveClinic() async {
    if (_formKey.currentState!.validate()) {
      final clinic = {
        'name': _nameController.text,
        'description': _descriptionController.text,
        'contactEmail': _contactEmailController.text,
        'contactNumber': _contactNumberController.text,
        'city': _cityController.text,
        'street': _streetController.text,
        'postalCode': _postalCodeController.text,
        'buildingNumber': _buildingNumberController.text,
      };

      try {
        final response = await http.post(
          Uri.parse('https://localhost:7137/api/clinic/'),
          body: json.encode(clinic),
          headers: {'Content-Type': 'application/json'},
        );

        if (response.statusCode == 200) {
          print('Klinika została dodana');
          widget.refreshClinics();
          Navigator.pop(context);
        } else {
          print('Nie udało się dodać kliniki');
        }
      } catch (e) {
        print('Wystąpił błąd podczas wysyłania danych do API: $e');
      }
    }
  }
}
