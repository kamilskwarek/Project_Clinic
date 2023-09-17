// ignore_for_file: avoid_print, prefer_const_constructors, prefer_const_literals_to_create_immutables

import 'package:flutter/material.dart';
import 'widgets/clinic_card.dart';
import 'package:clinic/models/clinic.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'clinic_Add.dart';
import 'clinic_Edit.dart';

class ClinisPage extends StatefulWidget {
  const ClinisPage({Key? key}) : super(key: key);

  @override
  State<ClinisPage> createState() => _ClinisPageState();
}

class _ClinisPageState extends State<ClinisPage> {
  List<Clinic> clinics = [];
  late List<Clinic> filteredClinics;
  bool isLoading = true;

  @override
  void initState() {
    super.initState();
    fetchClinics().then((clinicList) {
      setState(() {
        clinics = clinicList;
        filteredClinics = clinicList;
        isLoading = false;
      });
    }).catchError((error) {
      print('Error fetching clinics: $error');
    });
  }

  Future<List<Clinic>> fetchClinics() async {
    final response =
        await http.get(Uri.parse('https://localhost:7137/api/clinic/'));
    if (response.statusCode == 200) {
      final List<dynamic> jsonData = json.decode(response.body);
      return jsonData.map((json) => Clinic.fromJson(json)).toList();
    } else {
      throw Exception('Failed to fetch clinics');
    }
  }

  void deleteClinic(int id) {
    deleteClinicFromAPI(id).then((response) {}).catchError((error) {
      print('Error deleting clinic: $error');
    });
    setState(() {
      clinics.removeWhere((clinic) => clinic.id == id);
      filteredClinics.removeWhere((clinic) => clinic.id == id);
    });
  }

  Future<void> deleteClinicFromAPI(int id) async {
    final response =
        await http.delete(Uri.parse('https://localhost:7137/api/clinic/$id'));

    if (response.statusCode == 200) {
      print('Clinic deleted successfully');
    } else {
      throw Exception('Failed to delete clinic');
    }
  }

  void editClinic(int id) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => ClinicEditPage(clinicId: id)),
    ).then((_) {
      fetchClinics().then((clinicList) {
        setState(() {
          clinics = clinicList;
          filteredClinics = clinicList;
        });
      }).catchError((error) {
        print('Error fetching clinics: $error');
      });
    });
  }

  void refreshClinics() {
    fetchClinics().then((clinicList) {
      setState(() {
        clinics = clinicList;
        filteredClinics = clinicList;
      });
    }).catchError((error) {
      print('Error fetching clinics: $error');
    });
  }

  void filterClinics(String query) {
    setState(() {
      filteredClinics = clinics
          .where((clinic) =>
              clinic.name.toLowerCase().contains(query.toLowerCase()))
          .toList();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Row(
          children: [
            Icon(Icons.emergency),
            SizedBox(width: 10),
            Text('Placówki'),
          ],
        ),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              onChanged: filterClinics,
              decoration: InputDecoration(
                labelText: 'Wyszukaj klinikę',
                prefixIcon: Icon(Icons.search),
              ),
            ),
          ),
          Expanded(
            child: isLoading
                ? Center(child: CircularProgressIndicator())
                : ListView.builder(
                    itemCount: filteredClinics.length,
                    itemBuilder: (context, index) {
                      final clinic = filteredClinics[index];
                      return ClinicCard(
                        id: clinic.id,
                        name: clinic.name,
                        description: clinic.description,
                        contactEmail: clinic.contactEmail,
                        contactNumber: clinic.contactNumber,
                        onDelete: deleteClinic,
                        onEdit: editClinic,
                      );
                    },
                  ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
                builder: (context) =>
                    ClinicAddPage(refreshClinics: refreshClinics)),
          );
        },
        backgroundColor: Colors.teal,
        child: Icon(Icons.add),
      ),
    );
  }
}
