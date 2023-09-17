class Clinic {
  final int id;
  final String name;
  final String description;
  final String contactEmail;
  final String contactNumber;

  Clinic({
    required this.id,
    required this.name,
    required this.description,
    required this.contactEmail,
    required this.contactNumber,
  });

  factory Clinic.fromJson(Map<String, dynamic> json) {
    return Clinic(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      contactEmail: json['contactEmail'],
      contactNumber: json['contactNumber'],
    );
  }
}
