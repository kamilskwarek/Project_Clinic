import 'package:clinic/models/clinic.dart';
import 'dart:convert';

import 'package:http/http.dart' as http;

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
